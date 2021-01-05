import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './assets/scss/app.scss'

const App = () => {
	return (
		<Router>
			<Navbar />
			<main className="container">
				<Routes>
					<Route path="/">
						<h1>Photo Review App</h1>
					</Route>
					<Route path="login">
						<h1>Login</h1>
					</Route>
					<Route path="signup">
						<h1>Signup</h1>
					</Route>
					<Route path="forgot-password">
						<h1>Forgot Password</h1>
					</Route>
					<Route path="albums">
						<h1>Albums</h1>
					</Route>
				</Routes>
			</main>
		</Router>
	);
}

export default App;
