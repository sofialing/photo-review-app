import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClone } from '@fortawesome/free-solid-svg-icons'
import { deletePhoto } from '../../helpers'

const PhotoCardOptions = ({ photo }) => {
	return (
		<footer className="card-footer">
			<div className="card-footer-item">
				<FontAwesomeIcon
					icon={faClone}
					onClick={() => console.log('Copy photo to new album')}
					title="Select photo"
				/>
			</div>
			<div className="card-footer-item">
				<FontAwesomeIcon
					icon={faTrash}
					onClick={() => deletePhoto(photo.id, photo.path)}
					title="Remove photo from album"
				/>
			</div>
		</footer>
	)
}

export default PhotoCardOptions
