import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)

	useEffect(() => {
		return auth.onAuthStateChanged(user => {
			setUser(user)
			setLoading(false)
		})
	}, [])

	const createAccount = ({ email, password, displayName }) => {
		return auth.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => user.updateProfile({ displayName }))
	}

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return auth.signOut()
	}

	const resetPassword = (email) => {
		console.log('wants to reset password for', email)
		return auth.sendPasswordResetEmail(email)
	}

	const contextValues = {
		user,
		loading,
		login,
		logout,
		resetPassword,
		createAccount,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { useAuth, AuthContext, AuthContextProvider as default }
