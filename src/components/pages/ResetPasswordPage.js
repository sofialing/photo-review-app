import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import ResetPasswordForm from '../user/ResetPasswordForm'
import Notification from '../partials/Notification'
import imageSrc from '../../assets/images/forgot-password.png'

const ResetPasswordPage = () => {
	const { resetPassword } = useAuth()
	const [notification, setNotification] = useState(null)
	const [loading, setLoading] = useState(false)

	const onResetPassword = async (email) => {
		setNotification(null)
		setLoading(true)

		try {
			// reset password by email
			await resetPassword(email)
			setNotification(`New password sent to ${email}.`)
			setLoading(false)
		} catch (error) {
			setNotification(error.message)
			setLoading(false)
		}
	}

	return (
		<section className="section">
			<div className="container">
				<div className="columns is-vcentered">
					<div className="column is-4">
						<div className="card">
							<div className="card-content">
								<h1 className="title">Reset password</h1>
								<ResetPasswordForm onResetPassword={onResetPassword} loading={loading} />
								{notification && <Notification message={notification} setMessage={setNotification} />}
							</div>
						</div>
					</div>
					<div className="column is-5 is-offset-1">
						<figure className="image is-square">
							<img src={imageSrc} alt="" />
						</figure>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ResetPasswordPage
