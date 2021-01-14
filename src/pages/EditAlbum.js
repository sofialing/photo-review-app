import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAlbum } from '../services/firebase';
import useAlbum from '../hooks/useAlbum';
import EditAlbumForm from '../components/albums/EditAlbumForm';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/create-album.png';

const EditAlbum = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const { albumId } = useParams();
	const { album } = useAlbum(albumId);
	const navigate = useNavigate();

	const onSaveAlbum = async (newTitle) => {
		// check album title, return if it's the same as the current one
		if (newTitle === album.title) {
			return setError('Enter a name that is not the same as the current one.');
		}
		// reset state
		setError(false);
		setLoading(true);

		try {
			await updateAlbum(albumId, {
				title: newTitle,
				updatedAt: Date.now(),
			});
			navigate(`/albums/${albumId}`);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	}

	return (
		<div className="columns is-vcentered">
			<div className="column is-4">
				<div className="card">
					<div className="card-content">
						<h1 className="title">Edit album</h1>
						{<EditAlbumForm onSaveAlbum={onSaveAlbum} album={album} loading={loading} />}
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

export default EditAlbum;
