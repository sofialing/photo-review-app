import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShareSquare, faEdit } from '@fortawesome/free-solid-svg-icons';

const AlbumCardOptions = ({ albumId }) => {
	return (
		<footer className="album-card-options card-footer">
			<div className="card-footer-item">
				<Link to={`/albums/${albumId}/share`}>
					<FontAwesomeIcon icon={faShareSquare} title="Share album" />
				</Link>
			</div>
			<div className="card-footer-item">
				<Link to={`/albums/${albumId}/edit`}>
					<FontAwesomeIcon icon={faEdit} title="Edit album" />
				</Link>
			</div>
			<div className="card-footer-item">
				<Link to={`/albums/${albumId}/delete`}>
					<FontAwesomeIcon icon={faTrash} title="Delete album" />
				</Link>
			</div>
		</footer>
	)
}

export default AlbumCardOptions;
