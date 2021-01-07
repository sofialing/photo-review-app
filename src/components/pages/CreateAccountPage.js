import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Notification from '../partials/Notification'
import CreateAccountForm from '../user/CreateAccountForm'

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
		<div className="card">
			<div className="card-content">
				<h1 className="title">Create Account</h1>
				<CreateAccountForm onCreateAccount={onCreateAccount} loading={loading} />
				{error && <Notification message={error} setMessage={setError} type="danger" />}
			</div>
			<footer className="card-footer">
				<div className="card-footer-item">
					<small >Already have an account? <Link to="/login">Log in</Link></small>
				</div>
			</footer>
		</div>
	)
}

export default CreateAccountPage
