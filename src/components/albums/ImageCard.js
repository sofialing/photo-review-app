import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteImage } from '../../helpers'
import ReviewPhoto from '../review/ReviewPhoto'

const ImageCard = ({ image, reviewMode = false }) => {
	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<img src={image.url} alt={image.name} />
				</figure>
			</div>
			<div className="card-content">
				<small>{image.name}</small>
			</div>
			{reviewMode ? (
				<ReviewPhoto photo={image} />
			) : (
					<footer className="card-footer">
						<div className="card-footer-item">
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => deleteImage(image.id, image.path)}
								title="Remove image from album"
							/>
						</div>
					</footer>

				)}
		</div>
	)
}

export default ImageCard
