import ImageCard from './ImageCard'

const ImagesGrid = ({ images, reviewMode = false }) => {
	if (!images.length) {
		return <p className="my-6">You haven't uploaded any images to album yet.</p>
	}

	return (
		<section className="columns is-multiline my-6">
			{images.map((image, index) => (
				<article className="column is-6" key={index}>
					<ImageCard image={image} reviewMode={reviewMode} />
				</article>
			))}
		</section>
	)
}

export default ImagesGrid
