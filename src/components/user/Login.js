import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
	const { login } = useAuth()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const emailRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()

	const onSubmit = async e => {
		e.preventDefault();

		if (!emailRef.current.value || !passwordRef.current.value) {
			return setError('Please enter both email and password.');
		}

		setError(null);

		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	}

	return (
		<div className="card">
			<div className="card-content">
				<h1 className="title">Log In</h1>
				<form className="content" onSubmit={onSubmit}>
					<div className="field">
						<label className="label" htmlFor="email">Email</label>
						<div className="control has-icons-left has-icons-right">
							<input className="input" id="email" type="email" placeholder="Email" ref={emailRef} />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faEnvelope} />
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="password">Password</label>
						<div className="control has-icons-left">
							<input className="input" type="password" id="password" placeholder="Password" ref={passwordRef} />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faLock} />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button className="button is-primary" disabled={loading} type="submit">Login</button>
						</div>
					</div>
				</form>
				{error && (
					<div className="notification">
						<button className="delete"></button>
						{error}
					</div>
				)}
				<small>Don't have an account? <Link to="/create-account">Create account</Link></small>
			</div>
		</div>
	)
}

export default Login
