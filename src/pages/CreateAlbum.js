import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createAlbum } from '../services/firebase';
import CreateAlbumForm from '../components/albums/CreateAlbumForm';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/upload.png';

const CreateAlbum = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const onCreateAlbum = async (title) => {
		setError(false);
		setLoading(true);

		try {
			const albumRef = await createAlbum(title, user);
			navigate(`/albums/${albumRef.id}`);
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
						<h1 className="title">New album</h1>
						<CreateAlbumForm onCreateAlbum={onCreateAlbum} loading={loading} />
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

export default CreateAlbum;
