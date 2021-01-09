import { Link } from 'react-router-dom'
import imageSrc from '../../assets/images/photo-sharing.png'

const LandingPage = () => {
	return (
		<section className="landing-page hero is-fullheight-with-navbar">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-vcentered is-flex-direction-row-reverse">
						<div className="column is-5 is-offset-2">
							<figure className="image is-square">
								<img src={imageSrc} alt="" />
							</figure>
						</div>
						<div className="column is-5">
							<h1 className="title is-1 is-spaced">Simple Photo Reviewing</h1>
							<h2 className="subtitle is-5 is-muted is-spaced">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</h2>
							<div className="buttons my-5">
								<Link to="/create-account" className="button is-rounded is-primary is-spaced">Get Started</Link>
								<Link to="/login" className="button is-rounded is-spaced is-primary is-outlined">Log In</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LandingPage
