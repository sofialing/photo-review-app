import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Notification from '../partials/Notification'
import imageSrc from '../../assets/images/login.png'

const LogoutPage = () => {
	const { logout } = useAuth()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const onLogout = async () => {
		// reset error
		setError(null)

		try {
			setLoading(true)
			await logout()
			navigate('/')
		} catch (error) {
			setError(error.message)
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
								<h1 className="title">Log out</h1>
								<p>Are you sure you want to log out?</p>
								<div className="field is-grouped mt-5">
									<div className="control">
										<button className="button is-primary" disabled={loading} onClick={onLogout}>Log Out</button>
									</div>
									<div className="control">
										<button className="button is-primary is-outlined" disabled={loading} onClick={() => navigate(-1)}>Cancel</button>
									</div>
								</div>
								{error && <Notification message={error} setMessage={setError} type="danger" />}
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

export default LogoutPage
