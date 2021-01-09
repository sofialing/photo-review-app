import imageSrc from '../../assets/images/404.png'

const NotFoundPage = () => {
	return (
		<section className="section">
			<div className="container">
				<div className="columns is-centered">
					<div className="column is-half">
						<figure className="image is-square">
							<img src={imageSrc} alt="page is missing" />
						</figure>
						<h1 className="has-text-centered">Oh no! Page not found.</h1>
					</div>
				</div>
			</div>
		</section>
	)
}

export default NotFoundPage
