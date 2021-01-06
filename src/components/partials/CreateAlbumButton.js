import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const CreateAlbumButton = () => {
	return (
		<Link className="button is-primary" to="/albums/create">
			<span className="icon is-small">
				<FontAwesomeIcon icon={faPlusSquare} />
			</span>
			<strong>Create Album</strong>
		</Link>
	)
}

export default CreateAlbumButton
