import ImageCard from './ImageCard'

const ImagesGrid = ({ images }) => {
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
