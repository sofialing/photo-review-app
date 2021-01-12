import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAlbum } from '../services/firebase';
import useAlbum from '../hooks/useAlbum';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/create-album.png';

const DeleteAlbum = () => {
	const navigate = useNavigate();
	const { albumId } = useParams();
	const { album } = useAlbum(albumId);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const onDeleteAlbum = async () => {
		setError(false);
		setLoading(true);

		try {
			// delete album and navigate to albums page
			await deleteAlbum(albumId);
			navigate('/albums');
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	}

	return album && (
		<div className="columns is-vcentered">
			<div className="column is-4">
				<div className="card">
					<div className="card-content">
						<h1 className="title">Delete album</h1>
						<p>Are you sure you want to delete the album <em>"{album.title}"</em> and its photos?</p>
						<div className="buttons mt-5">
							<button className="button is-primary is-outlined" disabled={loading} onClick={() => navigate(-1)}>Cancel</button>
							<button className="button is-primary" disabled={loading} onClick={onDeleteAlbum}>Delete</button>
						</div>
						{error && <Notification message={error} setMessage={setError} type="danger" />}
					</div>
				</div>
			</div>
			<div className="column is-5 is-offset-1">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="" />
					</a>
				</figure>
			</div>
		</div>

	)
}

export default DeleteAlbum;
