import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const CreateAlbumButton = () => {
	return (
		<Link className="button is-primary" to="/create-album">
			<span className="icon is-small">
				<FontAwesomeIcon icon={faPlusSquare} title="Create album" />
			</span>
		</Link>
	)
}

export default CreateAlbumButton;
