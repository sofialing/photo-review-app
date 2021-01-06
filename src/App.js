import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import ReviewContextProvider from './contexts/ReviewContext'
import ProtectedRoute from './decorators/ProtectedRoute'
import CreateAlbumPage from './components/pages/CreateAlbumPage'
import Login from './components/user/Login'
import Navbar from './components/partials/Navbar'
import LandingPage from './components/pages/LandingPage'
import CreateAccount from './components/user/CreateAccount'
import AlbumsPage from './components/pages/AlbumsPage'
import SingleAlbumPage from './components/pages/SingleAlbumPage'
import ReviewAlbum from './components/review/ReviewAlbum'
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
								<AlbumsPage />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId">
								<SingleAlbumPage />
							</ProtectedRoute>
							<ProtectedRoute path="/create">
								<CreateAlbumPage />
							</ProtectedRoute>
						</Route>
						<ReviewContextProvider>
							<Route path="review" >
								<Route path="/:slug/:reviewId">
									<ReviewAlbum />
								</Route>
								<Route path="/completed">
									<ReviewCompleted />
								</Route>
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
