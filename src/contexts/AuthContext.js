import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)

	useEffect(() => {
		return auth.onAuthStateChanged(user => {
			console.log('onAuthStateChanged, user', user)
			user && user.isAnonymous ? setUser(null) : setUser(user)
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
		return auth.sendPasswordResetEmail(email)
	}

	const authGuest = () => {
		return auth.signInAnonymously()
	}

	const removeGuest = () => {
		return auth.currentUser.delete()
	}

	const contextValues = {
		user,
		loading,
		login,
		logout,
		resetPassword,
		createAccount,
		authGuest,
		removeGuest
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { useAuth, AuthContext, AuthContextProvider as default }
