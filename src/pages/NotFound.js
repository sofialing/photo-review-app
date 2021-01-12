import imageSrc from '../assets/images/404.png';

const NotFound = () => {
	return (
		<div className="columns is-centered">
			<div className="column is-half">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="" />
					</a>
				</figure>
				<h1 className="has-text-centered">Oh no! Page not found.</h1>
			</div>
		</div>
	)
}

export default NotFound;
