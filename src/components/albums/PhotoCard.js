import ReviewPhoto from '../review/ReviewPhoto'
import PhotoCardOptions from '../partials/PhotoCardOptions'

const PhotoCard = ({ photo, reviewMode = false }) => {
	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<img src={photo.url} alt={photo.name} />
				</figure>
			</div>
			<div className="card-content">
				<small>{photo.name}</small>
			</div>
			{reviewMode ? <ReviewPhoto photo={photo} /> : <PhotoCardOptions photo={photo} />}
		</div>
	)
}

export default PhotoCard
