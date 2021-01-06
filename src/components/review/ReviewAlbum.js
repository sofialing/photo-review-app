import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhotosGrid from '../albums/PhotosGrid'
import { useReview } from '../../contexts/ReviewContext'
import { submitPhotoReview } from '../../helpers/index'

const ReviewAlbum = () => {
	const navigate = useNavigate()
	const { reviewId } = useParams()
	const { album, photos, loading, approved, rejected, setReviewId } = useReview()
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		setReviewId(reviewId)
	}, [reviewId, setReviewId])

	const onSubmit = async () => {
		if (approved.length + rejected.length === photos.length) {
			setNotification(null)
			await submitPhotoReview(album, approved)
			navigate('/review/completed')
		} else {
			setNotification('You must review all photos before submitting.')
		}
	}

	return !loading && (
		<section className="container">
			<header className="mb-6">
				<h1 className="title">{album.title}</h1>
				<p className="subtitle">{photos.length} photos by {album.owner_name}</p>
			</header>
			<PhotosGrid photos={photos} reviewMode={true} />
			<aside className="level is-mobile">
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Approved</p>
						<p className="title">{approved.length}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Rejected</p>
						<p className="title">{rejected.length}</p>
					</div>
				</div>
			</aside>
			<button className="button is-primary" onClick={onSubmit}>Submit</button>
			{notification && (
				<div class="notification is-danger mt-4">
					<button class="delete" onClick={() => setNotification(null)}></button>
					{notification}
				</div>
			)}
		</section>
	)
}

export default ReviewAlbum
