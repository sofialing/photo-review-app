import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavbarMenu = () => {
	const { user } = useAuth();

	return user ?
		<div className="buttons">
			<Link className="button is-dark is-rounded is-inverted is-outlined" to="create-album">Create album</Link>
			<Link className="button is-dark is-rounded is-inverted is-outlined" to="logout">Log out</Link>
		</div> :
		<Link className="button is-dark is-rounded is-inverted is-outlined" to="login">Log in</Link>
}

export default NavbarMenu
