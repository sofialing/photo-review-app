import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = props => {
	const { user } = useAuth()
	return user ? <Route {...props} /> : <Navigate to='/login' />
}

export default ProtectedRoute
