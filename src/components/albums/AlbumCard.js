import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import imageFolder from '../../assets/images/image-folder.png'

const AlbumCard = ({ album }) => {
	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<Link to={album.id}>
						<img src={imageFolder} alt="" />
					</Link>
				</figure>
			</div>
			<div className="card-content has-text-centered">
				<Link to={album.id}>
					<h2 className="title">{album.title}</h2>
				</Link>
			</div>
			<footer className="card-footer">
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faEdit} />
				</div>
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faTrash} />
				</div>
			</footer>
		</div>
	)
}

export default AlbumCard
