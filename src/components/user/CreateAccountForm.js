import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const CreateAccountForm = ({ onCreateAccount, loading }) => {
	const emailRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();
	const confirmRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();

		// create new account
		onCreateAccount({
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirm: confirmRef.current.value,
			displayName: nameRef.current.value
		});
	}

	return (
		<form className="content" onSubmit={onSubmit}>
			<div className="field">
				<label className="label" htmlFor="name">Name</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input" id="name" type="text" ref={nameRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faUser} />
					</span>
				</div>
			</div>
			<div className="field">
				<label className="label" htmlFor="email">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input" id="email" type="email" ref={emailRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faEnvelope} />
					</span>
				</div>
			</div>
			<div className="field">
				<label className="label" htmlFor="password">Password</label>
				<div className="control has-icons-left">
					<input className="input" type="password" id="password" ref={passwordRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faLock} />
					</span>
				</div>
			</div>
			<div className="field">
				<label className="label" htmlFor="confirm">Confirm Password</label>
				<div className="control has-icons-left">
					<input className="input" type="password" id="confirm" ref={confirmRef} required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faLock} />
					</span>
				</div>
			</div>
			<div className="field mt-5">
				<button className="button is-primary" disabled={loading} type="submit">Sign up</button>
			</div>
		</form>
	)
}

export default CreateAccountForm;
