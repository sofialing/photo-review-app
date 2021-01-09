import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faImages, faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
	const { user } = useAuth()
	console.log(user)
	return (
		<nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="navbar-brand">
					<Link className="navbar-item" to="/">
						Photo<strong>Reviewer</strong>
					</Link>
				</div>
				<div className="navbar-menu">
					<div className="navbar-end">
						<NavLink to="/" className="navbar-item">
							<FontAwesomeIcon icon={faHome} title="Go to home page" />
							<span>Home</span>
						</NavLink>
						<NavLink to="/albums" className="navbar-item">
							<FontAwesomeIcon icon={faImages} title="Go to album page" />
							<span>Albums</span>
						</NavLink>
						<NavLink to="/profile" className="navbar-item">
							<FontAwesomeIcon icon={faUser} title="Go to profile page" />
							<span>Profile</span>
						</NavLink>
						<div className="navbar-item">
							<div className="buttons">
								{user
									? <Link className="button is-dark is-rounded is-inverted is-outlined" to="logout">Log Out</Link>
									: <Link className="button is-dark is-rounded is-inverted is-outlined" to="login">Log In</Link>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
		// <nav className="navbar has-background-dark">
		// 	<div className="container">
		// 		<Link to="/" className="logo" >Photo<strong>Reviewer</strong></Link>
		// 		<ul className="nav-list">
		// 			<li className="nav-list-item">
		// 				<NavLink to="/">
		// 					<FontAwesomeIcon icon={faHome} title="Go to home page" />
		// 					<small>Home</small>
		// 				</NavLink>
		// 			</li>
		// 			<li className="nav-list-item">
		// 				<NavLink to="/albums">
		// 					<FontAwesomeIcon icon={faImages} title="Go to album page" />
		// 					<small>Albums</small>
		// 				</NavLink>
		// 			</li>
		// 			<li className="nav-list-item">
		// 				<NavLink to="/profile">
		// 					<FontAwesomeIcon icon={faUser} title="Go to profile page" />
		// 					<small>Profile</small>
		// 				</NavLink>
		// 			</li>
		// 		</ul>
		// 	</div>
		// </nav>
	)
}

export default Navbar
