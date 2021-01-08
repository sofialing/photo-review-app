import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faShareSquare } from '@fortawesome/free-solid-svg-icons'

const ButtonGroup = () => {
	return (
		<div className="buttons has-addons">
			<Link to="share" className="button">
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faShareSquare} title="Share review link" />
				</span>
				<small>Share</small>
			</Link>
			<Link to="edit" className="button">
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faEdit} title="Edit album title" />
				</span>
				<small>Edit</small>
			</Link>
			<Link to="delete" className="button">
				<span className="icon is-small has-text-primary">
					<FontAwesomeIcon icon={faTrash} title="Delete album" />
				</span>
				<small>Delete</small>
			</Link>
		</div>
	)
}

export default ButtonGroup
