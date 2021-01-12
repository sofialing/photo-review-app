import imageSrc from '../../assets/images/photos-approved.png';

const ReviewCompleted = ({ nrOfPhotos }) => {
	return (
		<div className="columns is-centered">
			<div className="column is-half">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="photos approved" />
					</a>
				</figure>
				<h1 className="has-text-centered">Thank you! {nrOfPhotos} photos approved.</h1>
			</div>
		</div>
	)
}

export default ReviewCompleted;
