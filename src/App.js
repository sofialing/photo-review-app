import { Routes, Route } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';
import ProtectedRoute from './decorators/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import ReviewContextProvider from './contexts/ReviewContext';
import Album from './pages/Album';
import Albums from './pages/Albums';
import CreateAccount from './pages/CreateAccount';
import CreateAlbum from './pages/CreateAlbum';
import DeleteAlbum from './pages/DeleteAlbum';
import EditAlbum from './pages/EditAlbum';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import ReviewAlbum from './pages/ReviewAlbum';
import ShareAlbum from './pages/ShareAlbum';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import './assets/scss/main.scss';

const App = () => {
	return (
		<AuthContextProvider>
			<Navbar />
			<Container>
				<SimpleReactLightbox>
					<Routes>
						<Route path="/">
							<Home />
						</Route>
						<ProtectedRoute path="albums">
							<Route path="/">
								<Albums />
							</Route>
							<Route path="/:albumId">
								<Route path="/">
									<Album />
								</Route>
								<Route path="/edit">
									<EditAlbum />
								</Route>
								<Route path="/delete">
									<DeleteAlbum />
								</Route>
								<Route path="/share">
									<ShareAlbum />
								</Route>
							</Route>
						</ProtectedRoute>
						<ProtectedRoute path="create-album">
							<CreateAlbum />
						</ProtectedRoute>
						<Route path="create-account">
							<CreateAccount />
						</Route>
						<Route path="login">
							<Login />
						</Route>
						<ProtectedRoute path="/logout">
							<Logout />
						</ProtectedRoute>
						<ProtectedRoute path="profile">
							<Profile />
						</ProtectedRoute>
						<Route path="reset-password">
							<ResetPassword />
						</Route>
						<ReviewContextProvider>
							<Route path="/review/:slug/:reviewId">
								<ReviewAlbum />
							</Route>
						</ReviewContextProvider>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</SimpleReactLightbox>
			</Container>
			<Footer />
		</AuthContextProvider>
	);
}

export default App;
