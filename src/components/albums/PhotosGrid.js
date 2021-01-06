import PhotoCard from './PhotoCard'

const PhotosGrid = ({ photos, reviewMode = false }) => {
	if (!photos.length) {
		return <p className="my-6">You haven't uploaded any photos to album yet.</p>
	}

	return (
		<section className="columns is-multiline mt-4 mb-6">
			{photos.map((photo, index) => (
				<article className="column is-6" key={index}>
					<PhotoCard photo={photo} reviewMode={reviewMode} />
				</article>
			))}
		</section>
	)
}

export default PhotosGrid
