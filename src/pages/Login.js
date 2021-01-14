import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/user/LoginForm';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/login.png';

const Login = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const onLogin = async (email, password) => {
		// check if user has entered both email and password
		if (!email.length || !password.length) {
			return setError('Make sure you have entered both a valid email and a password.');
		}

		// reset state
		setError(null);
		setLoading(true);

		try {
			await login(email, password);
			navigate('/albums');
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
						<h1 className="title">Log in</h1>
						<LoginForm onLogin={onLogin} loading={loading} />
						{error && <Notification message={error} setMessage={setError} type="danger" />}
					</div>
					<footer className="card-footer">
						<div className="card-footer-item">
							<small className="is-spaced">
								New to Photo Reviewer? <Link to="/create-account">Create account</Link>
							</small>
						</div>
					</footer>
				</div>
			</div>
			<div className="column is-5 is-offset-1">
				<figure className="image is-square">
					<img src={imageSrc} alt="" />
				</figure>
			</div>
		</div>
	)
}

export default Login;
