import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import './assets/scss/app.scss'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navbar />
				<main className="container">
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
							<h1>Albums</h1>
						</Route>
					</Routes>
				</main>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
