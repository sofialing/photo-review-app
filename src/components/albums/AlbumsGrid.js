import AlbumCard from "./AlbumCard"

const AlbumsGrid = ({ albums }) => {
	if (!albums.length) {
		return <p className="my-6">You haven't created any albums yet.</p>
	}
	return (
		<section className="columns is-multiline mt-2 mb-6">
			{albums.map((album, index) =>
				<article className="column is-3" key={index}>
					<AlbumCard album={album} />
				</article>
			)}
		</section>
	)
}

export default AlbumsGrid
