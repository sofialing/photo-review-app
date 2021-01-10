import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import ReviewContextProvider from './contexts/ReviewContext'
import ProtectedRoute from './decorators/ProtectedRoute'
import CreateAlbumPage from './components/pages/CreateAlbumPage'
import LoginPage from './components/pages/LoginPage'
import LogoutPage from './components/pages/LogoutPage'
import Navbar from './components/partials/Navbar'
import Footer from './components/partials/Footer'
import LandingPage from './components/pages/LandingPage'
import CreateAccountPage from './components/pages/CreateAccountPage'
import AlbumsPage from './components/pages/AlbumsPage'
import SingleAlbumPage from './components/pages/SingleAlbumPage'
import EditAlbumPage from './components/pages/EditAlbumPage'
import DeleteAlbumPage from './components/pages/DeleteAlbumPage'
import ShareAlbumPage from './components/pages/ShareAlbumPage'
import ReviewAlbumPage from './components/pages/ReviewAlbumPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import NotFoundPage from './components/pages/NotFoundPage'
import './assets/scss/app.scss'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navbar />
				<main>
					<Routes>
						<Route path="/">
							<LandingPage />
						</Route>
						<Route path="login">
							<LoginPage />
						</Route>
						<ProtectedRoute path="/logout">
							<LogoutPage />
						</ProtectedRoute>
						<Route path="create-account">
							<CreateAccountPage />
						</Route>
						<Route path="reset-password">
							<ResetPasswordPage />
						</Route>
						<Route path="albums">
							<ProtectedRoute path="/">
								<AlbumsPage />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId">
								<SingleAlbumPage />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId/edit">
								<EditAlbumPage />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId/delete">
								<DeleteAlbumPage />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId/share">
								<ShareAlbumPage />
							</ProtectedRoute>
							<ProtectedRoute path="/create">
								<CreateAlbumPage />
							</ProtectedRoute>
						</Route>
						<ReviewContextProvider>
							<Route path="/review/:slug/:reviewId">
								<ReviewAlbumPage />
							</Route>
						</ReviewContextProvider>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</AuthContextProvider>
		</Router>
	);
}

export default App;
