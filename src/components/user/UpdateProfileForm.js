import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const UpdateProfileForm = ({ loading, user, onDeleteAccount, onUpdateProfile }) => {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmRef = useRef();

	const onDelete = (e) => {
		e.preventDefault();

		window.confirm('Are you sure you wish to delete account?')
			&& onDeleteAccount();
	}

	const onSubmit = (e) => {
		e.preventDefault();

		onUpdateProfile({
			displayName: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirm: confirmRef.current.value
		});
	}

	return (
		<form className="mb-5" onSubmit={onSubmit}>
			<div className="field">
				<label className="label" htmlFor="name">Name</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input" id="name" ref={nameRef} defaultValue={user.displayName} type="text" required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faUser} />
					</span>
				</div>
			</div>
			<div className="field">
				<label className="label" htmlFor="email">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input className="input" id="email" ref={emailRef} defaultValue={user.email} type="email" required />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faEnvelope} />
					</span>
				</div>
				<p className="help mt-2">Your email address is your identity and is used to log in.</p>
			</div>
			<div className="field">
				<label className="label" htmlFor="new-password">New password</label>
				<div className="control has-icons-left">
					<input className="input" id="new-password" ref={passwordRef} type="password" />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faLock} />
					</span>
				</div>
				<p className="help mt-2">Password must be 8 or more characters.</p>
			</div>
			<div className="field">
				<label className="label" htmlFor="confirm-password">Confirm new password</label>
				<div className="control has-icons-left">
					<input className="input" id="confirm-password" ref={confirmRef} type="password" />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faLock} />
					</span>
				</div>
			</div>
			<div className="buttons mt-5">
				<button className="button is-primary" disabled={loading} type="submit">Update profile</button>
				<button className="button is-outlined is-danger" disabled={loading} onClick={onDelete}>Delete account</button>
			</div>
		</form>
	)
}

export default UpdateProfileForm
