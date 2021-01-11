import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useReview } from '../../contexts/ReviewContext'
import { createReviewedAlbum } from '../../services/firebase'
import PhotosGrid from '../albums/PhotosGrid'
import ReviewCompleted from '../review/ReviewCompleted'
import AlbumNotFound from '../partials/AlbumNotFound'
import Notification from '../partials/Notification'

const ReviewAlbumPage = () => {
	const { removeGuest } = useAuth()
	const { reviewId } = useParams()
	const { album, photos, loading, error, approved, rejected, setReviewId } = useReview()
	const [notification, setNotification] = useState(null)
	const [completed, setCompleted] = useState(false)

	useEffect(() => {
		setReviewId(reviewId)
	}, [reviewId, setReviewId])

	const onSubmit = async () => {
		// check if all photos have been reviewed before submitting
		if (approved.length + rejected.length !== photos.length) {
			return setNotification('You must review all photos before submitting.');
		}

		try {
			await createReviewedAlbum(approved, album)
			await removeGuest()
			setCompleted(true)
		} catch (error) {
			setNotification(error.message)
		}
	}

	if (error) {
		return (
			<AlbumNotFound message={error} />
		)
	}

	if (completed) {
		return (
			<ReviewCompleted nrOfPhotos={approved.length} />
		)
	}

	return !loading && (
		<section className="review-page section">
			<div className="container">
				<header>
					<h1 className="title is-1">{album.title}</h1>
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
				{notification && <Notification message={notification} setMessage={notification} />}
			</div>
		</section>
	)
}

export default ReviewAlbumPage
