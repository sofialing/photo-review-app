import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
	const { user, logout } = useAuth();
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="navbar-brand">
					<NavLink to="/" className="navbar-item">
						Photo Review App
					</NavLink>
				</div>

				<div className="navbar-menu">
					<div className="navbar-start">
						<NavLink to="/" className="navbar-item">Home</NavLink>
						<NavLink to="/albums" className="navbar-item">Albums</NavLink>
					</div>

					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								{user
									? <NavLink to="albums/create" className="button is-primary">
										<span className="icon is-small">
											<FontAwesomeIcon icon={faPlusSquare} />
										</span>
										<strong>Create Album</strong>
									</NavLink>
									: <NavLink to="create-account" className="button is-primary">
										<strong>Create Account</strong>
									</NavLink>}

								{user
									? <button className="button is-light" onClick={logout}>Log out</button>
									: <NavLink to="login" className="button is-light">Log in</NavLink>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
