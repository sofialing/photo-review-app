import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UpdateProfileForm from '../components/user/UpdateProfileForm';
import Notification from '../components/partials/Notification';
import imageSrc from '../assets/images/user-profile.png';

const Profile = () => {
	const { user, deleteAccount, updateProfile, updateEmail, updatePassword } = useAuth();
	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(false);

	const onDeleteAccount = async () => {
		setNotification(null);
		setLoading(true);

		try {
			await deleteAccount();
		} catch (error) {
			setNotification(error.message);
			setLoading(false);
		}
	}

	const onUpdateProfile = async ({ displayName, email, password, confirm }) => {
		setNotification(null);

		if (password !== confirm) {
			return setNotification('Passwords do not match. Try again.');
		}

		try {
			setLoading(true);
			if (displayName !== user.displayName) {
				await updateProfile(displayName);
			}
			if (email !== user.email) {
				await updateEmail(email)
			}
			if (password.length) {
				await updatePassword(password);
			}
			setNotification('Profile updated.');
		} catch (error) {
			setNotification(error.message);
		}
		setLoading(false);
	}

	return (
		<div className="columns is-vcentered">
			<div className="column is-4">
				<div className="card">
					<div className="card-content">
						<h1 className="title">User Profile</h1>
						<UpdateProfileForm loading={loading} user={user} onDeleteAccount={onDeleteAccount} onUpdateProfile={onUpdateProfile} />
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

export default Profile
