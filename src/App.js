import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import ReviewContextProvider from './contexts/ReviewContext'
import ProtectedRoute from './decorators/ProtectedRoute'
import CreateAlbum from './components/albums/CreateAlbum'
import Login from './components/user/Login'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import CreateAccount from './components/user/CreateAccount'
import './assets/scss/app.scss'
import Albums from './components/albums/Albums'
import SingleAlbum from './components/albums/SingleAlbum'
import ReviewAlbum from './components/review/ReviewAlbum'
import NotFoundPage from './components/NotFoundPage'
import ReviewCompleted from './components/review/ReviewCompleted'

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
								<Albums />
							</ProtectedRoute>
							<ProtectedRoute path="/:albumId">
								<SingleAlbum />
							</ProtectedRoute>
							<ProtectedRoute path="/create">
								<CreateAlbum />
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
