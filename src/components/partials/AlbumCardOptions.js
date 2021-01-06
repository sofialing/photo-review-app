import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faShareSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import { deleteAlbum } from '../../helpers'

const AlbumCardOptions = ({ albumId }) => {
	const navigate = useNavigate()

	return (
		<footer className="album-card-options card-footer">
			<div className="card-footer-item">
				<FontAwesomeIcon
					icon={faShareSquare}
					onClick={() => navigate(`/albums/${albumId}/share`)}
					title="Share album"
				/>
			</div>
			<div className="card-footer-item">
				<FontAwesomeIcon
					icon={faEdit}
					onClick={() => navigate(`/albums/${albumId}/edit`)}
					title="Edit album"
				/>
			</div>
			<div className="card-footer-item">
				<FontAwesomeIcon
					icon={faTrash}
					onClick={() => deleteAlbum(albumId)}
					title="Delete album"
				/>
			</div>
		</footer>
	)
}

export default AlbumCardOptions
