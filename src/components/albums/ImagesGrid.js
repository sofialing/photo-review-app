import ImageCard from './ImageCard'

const ImagesGrid = ({ images }) => {
	if (!images.length) {
		return <p className="my-6">You haven't uploaded any images to album yet.</p>
	}

	return (
		<section className="columns is-multiline my-6">
			{images.map((image, index) => (
				<article className="column is-3" key={index}>
					<ImageCard image={image} />
				</article>
			))}
		</section>
	)
}

export default ImagesGrid
