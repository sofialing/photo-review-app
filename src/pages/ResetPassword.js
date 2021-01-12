import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ResetPasswordForm from '../components/user/ResetPasswordForm';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/forgot-password.png';

const ResetPassword = () => {
	const { resetPassword } = useAuth();
	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(false);

	const onResetPassword = async (email) => {
		setNotification(null);
		setLoading(true);

		try {
			// reset password by email
			await resetPassword(email);
			setNotification(`New password sent to ${email}.`);
			setLoading(false);
		} catch (error) {
			setNotification(error.message);
			setLoading(false);
		}
	}

	return (
		<div className="columns is-vcentered">
			<div className="column is-4">
				<div className="card">
					<div className="card-content">
						<h1 className="title">Reset password</h1>
						<p className="mb-5">Enter your user account's email address and we will send you a password reset link.</p>
						<ResetPasswordForm onResetPassword={onResetPassword} loading={loading} />
						{notification && <Notification message={notification} setMessage={setNotification} />}
					</div>
				</div>
			</div>
			<div className="column is-5 is-offset-1">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="" />
					</a>
				</figure>
			</div>
		</div>
	)
}

export default ResetPassword;
