import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faShareSquare, faClone } from '@fortawesome/free-solid-svg-icons';

const AlbumOptions = ({ hasPhotos, hasSelectedPhotos, onCopyPhotos }) => {
	return (
		<aside className="buttons has-addons">
			<button disabled={!hasSelectedPhotos} className="button" onClick={onCopyPhotos}>
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faClone} title="Clone photos to new album" />
				</span>
				<small>Copy</small>
			</button>
			<Link to="delete" className="button">
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faTrash} title="Delete album" />
				</span>
				<small>Delete</small>
			</Link>
			<Link to="edit" className="button">
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faEdit} title="Edit album" />
				</span>
				<small>Edit</small>
			</Link>
			<Link to="share" className={`button ${!hasPhotos ? 'is-disabled' : ''}`}>
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faShareSquare} title="Share review link" />
				</span>
				<small>Share</small>
			</Link>
		</aside>
	)
}

export default AlbumOptions;
