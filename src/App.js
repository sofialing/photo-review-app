import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import ReviewContextProvider from './contexts/ReviewContext'
import ProtectedRoute from './decorators/ProtectedRoute'
import CreateAlbumPage from './components/pages/CreateAlbumPage'
import LoginPage from './components/pages/LoginPage'
import Navbar from './components/partials/Navbar'
import LandingPage from './components/pages/LandingPage'
import CreateAccountPage from './components/pages/CreateAccountPage'
import AlbumsPage from './components/pages/AlbumsPage'
import SingleAlbumPage from './components/pages/SingleAlbumPage'
import EditAlbumPage from './components/pages/EditAlbumPage'
import ReviewAlbumPage from './components/pages/ReviewAlbumPage'
import NotFoundPage from './components/pages/NotFoundPage'
import ReviewCompleted from './components/review/ReviewCompleted'
import './assets/scss/app.scss'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navbar />
				<main className="section">
					<Routes>
						<Route path="/">
							<LandingPage />
						</Route>
						<Route path="login">
							<LoginPage />
						</Route>
						<Route path="create-account">
							<CreateAccountPage />
						</Route>
						<Route path="forgot-password">
							<h1>Forgot Password</h1>
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
							<ProtectedRoute path="/create">
								<CreateAlbumPage />
							</ProtectedRoute>
						</Route>
						<ReviewContextProvider>
							<Route path="review/:slug/:reviewId" >
								<ReviewAlbumPage />
							</Route>
							<Route path="review/completed">
								<ReviewCompleted />
							</Route>
						</ReviewContextProvider>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
