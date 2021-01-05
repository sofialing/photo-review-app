import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

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
					<FontAwesomeIcon icon={faThumbsDown} />
				</div>
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faThumbsUp} />
				</div>
			</footer>
		</div>
	)
}

export default ImageCard
