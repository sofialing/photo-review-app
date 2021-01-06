import { useParams } from 'react-router-dom'
import useReview from '../../hooks/useReview'
import ImagesGrid from '../albums/ImagesGrid'

const Review = () => {
	const { reviewId } = useParams()
	const { album, images, loading, error } = useReview(reviewId)

	if (error) {
		return <h1>{error}</h1>
	}

	return !loading && (
		<section className="container">
			<header>
				<h1 className="title">{album.title}</h1>
				<p className="subtitle">{images.length} photos by {album.owner_name}</p>
			</header>
			<ImagesGrid images={images} review={true} />
		</section>
	)
}

export default Review
