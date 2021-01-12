import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
	return (
		<nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="navbar-brand">
					<Link className="navbar-item" to="/">
						Photo<strong>Reviewer</strong>
					</Link>
				</div>
				<NavbarMenu />
			</div>
		</nav>
	)
}

export default Navbar;
