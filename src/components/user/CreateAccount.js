import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext'

const CreateAccount = () => {
	const { createAccount } = useAuth()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const emailRef = useRef()
	const nameRef = useRef()
	const passwordRef = useRef()
	const confirmRef = useRef()
	const navigate = useNavigate()

	const onSubmit = async e => {
		e.preventDefault()

		if (passwordRef.current.value !== confirmRef.current.value) {
			return setError('The passwords does not match.')
		}

		setError(null)

		try {
			setLoading(true)
			await createAccount(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
			navigate('/')
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<div className="card">
			<div className="card-content">
				<h1 className="title">Create Account</h1>
				<form className="content" onSubmit={onSubmit}>
					<div className="field">
						<label className="label" htmlFor="name">Name</label>
						<div className="control has-icons-left has-icons-right">
							<input className="input" id="name" type="text" ref={nameRef} />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faUser} />
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="email">Email</label>
						<div className="control has-icons-left has-icons-right">
							<input className="input" id="email" type="email" ref={emailRef} />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faEnvelope} />
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="password">Password</label>
						<div className="control has-icons-left">
							<input className="input" type="password" id="password" ref={passwordRef} />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faLock} />
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="password-confirm">Confirm Password</label>
						<div className="control has-icons-left">
							<input className="input" type="password" id="password-confirm" ref={confirmRef} />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faLock} />
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button className="button is-primary" disabled={loading} type="submit">Create account</button>
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

export default CreateAccount
