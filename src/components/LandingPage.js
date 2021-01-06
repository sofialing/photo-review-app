import { Link } from 'react-router-dom'
import photoSharing from '../assets/images/photo-sharing.png'

const LandingPage = () => {
	return (
		<div className="container has-text-centered">
			<figure className="image">
				<img src={photoSharing} alt="" />
			</figure>
			<h1 className="title">Photo Review App</h1>
			<p className="subtitle is-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>

			<div class="field is-grouped is-justify-content-center">
				<div class="control">
					<Link to="/login" class="button is-rounded is-primary">
						Log In
   					 </Link>
				</div>
				<div class="control">
					<Link to="/create-account" class="button is-rounded is-primary">
						Create Account
   					 </Link>
				</div>
			</div>
		</div>
	)
}

export default LandingPage
