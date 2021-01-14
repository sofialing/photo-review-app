import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/shutter.svg';

const MobileHeader = () => {
	const { user } = useAuth();
	return (
		<nav className="mobile-navbar" role="navigation" aria-label="mobile secondary navigation">
			<div className="container">
				<div className="navbar-brand">
					<Link className="navbar-item logo" to="/">
						<img src={logo} alt="" />
						Photo<strong>Reviewer</strong>
					</Link>
				</div>
				{user
					? <Link className="navbar-item" to="logout">Log out</Link>
					: <Link className="navbar-item" to="login">Log in</Link>
				}
			</div>
		</nav>
	)
}

export default MobileHeader;
