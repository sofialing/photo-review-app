import { Link } from 'react-router-dom'
import imageSrc from '../../assets/images/photo-sharing.png'

const LandingPage = () => {
	return (
		<div className="container has-text-centered">
			<header className="mb-5">
				<img src={imageSrc} alt="" />
				<h1 className="title">Photo Review App</h1>
				<p className="subtitle is-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
			</header>
			<div className="field is-grouped is-justify-content-center">
				<div className="control">
					<Link to="/login" className="button is-rounded is-primary">
						Log In
   					 </Link>
				</div>
				<div className="control">
					<Link to="/create-account" className="button is-rounded is-primary">
						Create Account
   					 </Link>
				</div>
			</div>
		</div>
	)
}

export default LandingPage
