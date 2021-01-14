import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImages, faUser } from '@fortawesome/free-solid-svg-icons';
import NavbarMenuButtons from './NavbarMenuButtons';

const NavbarMenu = () => {
	return (
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
				<div className="navbar-item navbar-buttons">
					<NavbarMenuButtons />
				</div>
			</div>
		</div>
	)
}

export default NavbarMenu;
