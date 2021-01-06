import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import ProtectedRoute from './decorators/ProtectedRoute'
import CreateAlbum from './components/albums/CreateAlbum'
import Login from './components/user/Login'
import NavbarTest from './components/NavbarTest'
import LandingPage from './components/LandingPage'
import CreateAccount from './components/user/CreateAccount'
import './assets/scss/app.scss'
import Albums from './components/albums/Albums'
import SingleAlbum from './components/albums/SingleAlbum'
import Review from './components/review/Review'
import NotFoundPage from './components/NotFoundPage'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<NavbarTest />
				<main className="section">
					<Routes>
						<Route path="/">
							<LandingPage />
						</Route>
						<Route path="login">
							<Login />
						</Route>
						<Route path="create-account">
							<CreateAccount />
						</Route>
						<Route path="forgot-password">
							<h1>Forgot Password</h1>
						</Route>
						<Route path="albums">
							<ProtectedRoute path="/">
								<Albums />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId">
								<SingleAlbum />
							</ProtectedRoute>
							<ProtectedRoute path="/create">
								<CreateAlbum />
							</ProtectedRoute>
						</Route>
						<Route path="review/:slug/:reviewId" >
							<Review />
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
