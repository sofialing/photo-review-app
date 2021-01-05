import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import ProtectedRoute from './decorators/ProtectedRoute'
import CreateAlbum from './components/albums/CreateAlbum'
import Login from './components/user/Login'
import Navbar from './components/Navbar'
import Signup from './components/user/Signup'
import './assets/scss/app.scss'
import Albums from './components/albums/Albums'
import SingleAlbum from './components/albums/SingleAlbum'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navbar />
				<main className="section">
					<Routes>
						<Route path="/">
							<h1>Photo Review App</h1>
						</Route>
						<Route path="login">
							<Login />
						</Route>
						<Route path="signup">
							<Signup />
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
						<Route path="*" element={<h1>Page not found</h1>} />
					</Routes>
				</main>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
