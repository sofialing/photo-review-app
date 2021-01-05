import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Signup = () => {
	const { signup } = useAuth()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmRef = useRef()
	const navigate = useNavigate()

	const onSubmit = async e => {
		e.preventDefault();

		if (passwordRef.current.value !== confirmRef.current.value) {
			return setError('The passwords does not match.');
		}

		setError(null);

		try {
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	}

	return (
		<div className="card">
			<div className="card-content">
				<h1 className="title">Sign Up</h1>
				<form className="content" onSubmit={onSubmit}>
					<div className="field">
						<label className="label" htmlFor="email">Email</label>
						<div className="control has-icons-left has-icons-right">
							<input className="input" id="email" type="email" placeholder="Email" ref={emailRef} />
							<span className="icon is-small is-left">
								<i className="fas fa-envelope"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="password">Password</label>
						<div className="control has-icons-left">
							<input className="input" type="password" id="password" placeholder="Password" ref={passwordRef} />
							<span className="icon is-small is-left">
								<i className="fas fa-lock"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="password-confirm">Confirm Password</label>
						<div className="control has-icons-left">
							<input className="input" type="password" id="password-confirm" placeholder="Password" ref={confirmRef} />
							<span className="icon is-small is-left">
								<i className="fas fa-lock"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button className="button is-success" disabled={loading} type="submit">Create account</button>
						</div>
					</div>
				</form>
				{error && (
					<div className="notification">
						<button className="delete"></button>
						{error}
					</div>
				)}
				<small>Already have an account? <Link to="/login">Log in</Link></small>
			</div>
		</div>
	)
}

export default Signup
