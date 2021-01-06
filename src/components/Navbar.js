import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faImages, faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
	return (
		<nav className="navbar has-background-dark">
			<div className="container">
				<ul className="navbar-menu">
					<li className="navbar-item">
						<NavLink to="/" className="has-text-white-ter">
							<FontAwesomeIcon icon={faHome} title="Go to home page" />
							<small>Home</small>
						</NavLink>
					</li>
					<li className="navbar-item">
						<NavLink to="/albums" className="has-text-white-ter">
							<FontAwesomeIcon icon={faImages} title="Go to album page" />
							<small>Albums</small>
						</NavLink>

					</li>
					<li className="navbar-item">
						<NavLink to="/profile" className="has-text-white-ter">
							<FontAwesomeIcon icon={faUser} title="Go to profile page" />
							<small>Profile</small>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
