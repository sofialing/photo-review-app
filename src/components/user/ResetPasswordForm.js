import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const ResetPasswordForm = ({ onResetPassword, loading }) => {
	const navigate = useNavigate()
	const emailRef = useRef()

	useEffect(() => emailRef.current.focus(), [])

	const onSubmit = e => {
		e.preventDefault()

		// reset password
		if (emailRef.current.value) {
			onResetPassword(emailRef.current.value)
		}
	}

	const onCancel = e => {
		e.preventDefault()

		// go back to previous page
		navigate(-1)
	}

	return (
		<form className="mb-5" onSubmit={onSubmit}>
			<div className="field">
				<label className="label" htmlFor="email">Email</label>
				<div className="control has-icons-left">
					<input className="input" id="email" type="email" placeholder="Email" ref={emailRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faEnvelope} />
					</span>
				</div>
			</div>
			<div className="field is-grouped mt-5">
				<div className="control">
					<button className="button is-primary" disabled={loading}>Reset</button>
				</div>
				<div className="control">
					<button className="button is-primary is-light" disabled={loading} onClick={onCancel}>Cancel</button>
				</div>
			</div>
		</form>
	)
}

export default ResetPasswordForm
