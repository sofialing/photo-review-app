import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import imageFolder from '../../assets/images/image-folder.png'
import { deleteAlbum } from '../../helpers'

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
					<FontAwesomeIcon icon={faShareSquare} title="Share album" />
				</div>
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faEdit} title="Edit album" />
				</div>
				<div className="card-footer-item">
					<FontAwesomeIcon
						icon={faTrash}
						onClick={() => deleteAlbum(album.id)}
						title="Delete album"
					/>
				</div>
			</footer>
		</div>
	)
}

export default AlbumCard
