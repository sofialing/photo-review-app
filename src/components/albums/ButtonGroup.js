import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faShareSquare } from '@fortawesome/free-solid-svg-icons'

const ButtonGroup = () => {
	return (
		<ul className="field has-addons">
			<li className="control">
				<button className="button">
					<span className="icon is-small">
						<FontAwesomeIcon icon={faShareSquare} title="Share album" />
					</span>
					<span>Share</span>
				</button>
			</li>
			<li className="control">
				<button className="button">
					<span className="icon is-small">
						<FontAwesomeIcon icon={faEdit} title="Share album" />
					</span>
					<span>Edit</span>
				</button>
			</li>
			<li className="control">
				<button className="button">
					<span className="icon is-small">
						<FontAwesomeIcon icon={faTrash} title="Share album" />
					</span>
					<span>Delete</span>
				</button>
			</li>
		</ul>
	)
}

export default ButtonGroup
