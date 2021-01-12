import imageSrc from '../../assets/images/image-folder.png';

const AlbumNotFound = ({ message }) => {
	return (
		<div className="columns is-centered">
			<div className="column is-half">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="" />
					</a>
				</figure>
				<h1 className="has-text-centered">{message}</h1>
			</div>
		</div>
	)
}

export default AlbumNotFound;
