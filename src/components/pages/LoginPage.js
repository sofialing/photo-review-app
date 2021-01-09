import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoginForm from '../user/LoginForm'
import Notification from '../partials/Notification'
import imageSrc from '../../assets/images/login.png'

const LoginPage = () => {
	const { login } = useAuth()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const onLogin = async (email, password) => {
		// check if user has entered both email and password
		if (!email.length || !password.length) {
			return setError('Make sure you have entered both a valid email and a password.')
		}

		// reset error
		setError(null)

		try {
			setLoading(true)
			await login(email, password)
			navigate('/albums')
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<section className="section">
			<div className="container">
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
									<small className="is-spaced">New to PhotoReviewer? <Link to="/create-account">Create account</Link></small>
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
			</div>
		</section>
	)
}

export default LoginPage
