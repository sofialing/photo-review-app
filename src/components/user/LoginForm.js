import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onLogin, loading }) => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		// login with email and password
		onLogin(emailRef.current.value, passwordRef.current.value);
	}

	return (
		<form className="mb-5" onSubmit={onSubmit}>
			<div className="field">
				<label className="label" htmlFor="email">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input" id="email" type="email" placeholder="Email" ref={emailRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faEnvelope} />
					</span>
				</div>
			</div>
			<div className="field">
				<div className="is-flex is-justify-content-space-between">
					<label className="label" htmlFor="password">Password</label>
					<small><Link to="/reset-password">Forgot password?</Link></small>
				</div>
				<div className="control has-icons-left">
					<input className="input" type="password" id="password" placeholder="Password" ref={passwordRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faLock} />
					</span>
				</div>
			</div>
			<div className="field mt-5">
				<button className="button is-primary" disabled={loading} type="submit">Log in</button>
			</div>
		</form>
	)
}

export default LoginForm;
