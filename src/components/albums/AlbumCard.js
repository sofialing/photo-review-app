import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getPhotos } from '../../services/firebase';
import imageSrc from '../../assets/images/image-folder.png';
import AlbumCardOptions from '../partials/AlbumCardOptions';

const AlbumCard = ({ album }) => {
	const [coverPhoto, setCoverPhoto] = useState(null)

	useEffect(() => {
		getPhotos(album.id)
			.then(snapshot => {
				if (snapshot.empty) {
					return;
				}
				setCoverPhoto(snapshot.docs[0].data().url);
			})
	}, [album.id])

	return (
		<div className="card album-card">
			<div className="card-image">
				<Link to={album.id}>
					<figure className="image is-square">
						<img src={coverPhoto ? coverPhoto : imageSrc} alt="" />
					</figure>
				</Link>
			</div>
			<div className="card-content">
				<Link to={album.id}>
					<h2 className="title is-6">{album.title}</h2>
				</Link>
				{album.updatedAt
					? <p className="is-6">Updated {moment(album.updatedAt).from()}</p>
					: <p className="is-6">Created {moment(album.createdAt).from()}</p>
				}
			</div>
			<AlbumCardOptions albumId={album.id} />
		</div>
	)
}

export default AlbumCard
