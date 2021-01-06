import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { deleteAlbum, getReviewLink } from '../../helpers'

const ButtonGroup = ({ albumId }) => {
	const navigate = useNavigate()

	const onDeleteAlbum = async () => {
		await deleteAlbum(albumId)
		navigate('/albums')
	}

	const onEditAlbum = () => {
		console.log('wants to edit album', albumId)
	}

	const onShareAlbum = async () => {
		const url = await getReviewLink(albumId)
		console.log('review link:', url);
	}

	return (
		<ul className="field has-addons">
			<li className="control">
				<button className="button" onClick={onShareAlbum}>
					<span className="icon is-small">
						<FontAwesomeIcon icon={faShareSquare} title="Share album" />
					</span>
					<span>Share</span>
				</button>
			</li>
			<li className="control">
				<button className="button" onClick={onEditAlbum}>
					<span className="icon is-small">
						<FontAwesomeIcon icon={faEdit} title="Edit album" />
					</span>
					<span>Edit</span>
				</button>
			</li>
			<li className="control">
				<button className="button" onClick={onDeleteAlbum}>
					<span className="icon is-small">
						<FontAwesomeIcon icon={faTrash} title="Delete album" />
					</span>
					<span>Delete</span>
				</button>
			</li>
		</ul>
	)
}

export default ButtonGroup
