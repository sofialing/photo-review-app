import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';
import logo from '../../assets/images/shutter.svg';

const Navbar = () => {
	return (
		<nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="navbar-brand">
					<Link className="navbar-item logo" to="/">
						<img src={logo} alt="" />
						Photo<strong>Reviewer</strong>
					</Link>
				</div>
				<NavbarMenu />
			</div>
		</nav>
	)
}

export default Navbar;
