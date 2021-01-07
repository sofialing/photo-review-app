import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoginForm from '../user/LoginForm'
import Notification from '../partials/Notification'

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
			navigate('/')
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<div className="card">
			<div className="card-content">
				<h1 className="title">Log In</h1>
				<LoginForm onLogin={onLogin} loading={loading} />
				{error && <Notification message={error} setMessage={setError} type="danger" />}
			</div>
			<footer className="card-footer">
				<div className="card-footer-item">
					<small>Don't have an account? <Link to="/create-account">Sign up</Link></small>
				</div>
			</footer>
		</div>
	)
}

export default LoginPage
