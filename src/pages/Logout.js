import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/login.png';

const Logout = () => {
	const { logout } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onLogout = async () => {
		// reset error and loading
		setError(null);
		setLoading(true);

		try {
			await logout();
			navigate('/');
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
						<h1 className="title">Log out</h1>
						<p>Are you sure you want to log out?</p>
						<div className="buttons mt-5">
							<button className="button is-primary" disabled={loading} onClick={onLogout}>Log out</button>
							<button className="button is-primary is-outlined" disabled={loading} onClick={() => navigate(-1)}>Cancel</button>
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

export default Logout;
