import { Link } from 'react-router-dom';
import imageSrc from '../assets/images/photo-sharing.png';

const Home = () => {
	return (
		<div className="columns is-vcentered is-flex-direction-row-reverse">
			<div className="column is-5 is-offset-2">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="" />
					</a>
				</figure>
			</div>
			<div className="column is-5">
				<h1 className="title is-1 is-spaced">Simple Photo Reviewing</h1>
				<p className="subtitle is-5 is-muted is-spaced">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
				</p>
				<div className="buttons my-5">
					<Link to="/create-account" className="button is-rounded is-primary is-spaced">
						Get started
					</Link>
					<Link to="/login" className="button is-rounded is-spaced is-primary is-outlined">
						Log in
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home;
