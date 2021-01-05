import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteImage } from '../../helpers'

const ImageCard = ({ image }) => {
	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<img src={image.url} alt={image.name} />
				</figure>
			</div>
			<div className="card-content">
				<p>{image.name}</p>
			</div>
			<footer className="card-footer">
				<div className="card-footer-item">
					<FontAwesomeIcon
						icon={faTrash}
						onClick={() => deleteImage(image.id, image.path)}
						title="Remove image from album"
					/>
				</div>
				{/* <div className="card-footer-item">
					<FontAwesomeIcon icon={faThumbsDown} />
				</div>
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faThumbsUp} />
				</div> */}
			</footer>
		</div>
	)
}

export default ImageCard
