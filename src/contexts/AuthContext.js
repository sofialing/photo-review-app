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
			console.log('auth state changed', user)
			setUser(user)
			setLoading(false)
		})
	}, [])

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return auth.signOut()
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}

	const contextValues = {
		user,
		loading,
		login,
		logout,
		resetPassword,
		signup,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { useAuth, AuthContext, AuthContextProvider as default }
