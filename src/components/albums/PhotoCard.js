import ReviewPhoto from '../review/ReviewPhoto';
import PhotoCardOptions from '../partials/PhotoCardOptions';

const PhotoCard = ({ photo, setSelectedPhotos, reviewMode = false }) => {
	return (
		<div className="card photo-card">
			<div className="card-image">
				<figure className="image is-square">
					<img src={photo.url} alt={photo.name} onContextMenu={(e) => e.preventDefault()} />
				</figure>
			</div>
			<div className="card-content py-4">
				<p className="is-size-7">{photo.name}</p>
			</div>
			{reviewMode
				? <ReviewPhoto photo={photo} />
				: <PhotoCardOptions photo={photo} selectPhoto={setSelectedPhotos} />
			}
		</div>
	)
}

export default PhotoCard;
