import { Link } from 'react-router-dom'
import imageSrc from '../../assets/images/image-folder.png'
import AlbumCardOptions from '../partials/AlbumCardOptions'

const AlbumCard = ({ album }) => {
	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<Link to={album.id}>
						<img src={imageSrc} alt="" />
					</Link>
				</figure>
			</div>
			<div className="card-content">
				<Link to={album.id}>
					<h2 className="title is-5">{album.title}</h2>
				</Link>
			</div>
			<AlbumCardOptions albumId={album.id} />
		</div>
	)
}

export default AlbumCard
