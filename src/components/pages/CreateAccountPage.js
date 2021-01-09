import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Notification from '../partials/Notification'
import CreateAccountForm from '../user/CreateAccountForm'
import imageSrc from '../../assets/images/signup.png'

const CreateAccountPage = () => {
	const navigate = useNavigate()
	const { createAccount } = useAuth()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const onCreateAccount = async credentials => {
		// check if password and password confirmation match
		if (credentials.password !== credentials.confirm) {
			return setError('Passwords do not match, please try again.')
		}

		// reset error
		setError(null)

		try {
			setLoading(true)
			await createAccount(credentials)
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
								<h1 className="title">Create account</h1>
								<CreateAccountForm onCreateAccount={onCreateAccount} loading={loading} />
								{error && <Notification message={error} setMessage={setError} type="danger" />}
							</div>
							<footer className="card-footer">
								<div className="card-footer-item">
									<small className="is-spaced">Already have an account? <Link to="/login">Log in</Link></small>
								</div>
							</footer>
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

export default CreateAccountPage
