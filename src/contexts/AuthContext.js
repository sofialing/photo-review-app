import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

// Create Auth Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Create Auth Context Provider
const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		return auth.onAuthStateChanged(user => {
			user && user.isAnonymous ? setUser(null) : setUser(user);
			setLoading(false);
		})
	}, [])

	const createAccount = ({ email, password, displayName }) => {
		return auth.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => user.updateProfile({ displayName }));
	}

	const deleteAccount = () => {
		return user.delete();
	}

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	}

	const logout = () => {
		return auth.signOut();
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	}

	const updateEmail = (email) => {
		return user.updateEmail(email);
	}

	const updateProfile = (displayName) => {
		return user.updateProfile({ displayName });
	}

	const updatePassword = (newPassword) => {
		return user.updatePassword(newPassword);
	}

	const authGuest = () => {
		return auth.signInAnonymously();
	}

	const removeGuest = () => {
		return auth.currentUser.delete();
	}

	const contextValues = {
		authGuest,
		createAccount,
		deleteAccount,
		loading,
		login,
		logout,
		removeGuest,
		resetPassword,
		updateEmail,
		updatePassword,
		updateProfile,
		user,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { useAuth, AuthContext, AuthContextProvider as default }
