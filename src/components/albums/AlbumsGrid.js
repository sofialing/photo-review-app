import AlbumCard from "./AlbumCard"

const AlbumsGrid = ({ albums }) => {
	return (
		<section className="columns is-multiline my-6">
			{albums.map((album, index) =>
				<article className="column is-3" key={index}>
					<AlbumCard album={album} />
				</article>
			)}
		</section>
	)
}

export default AlbumsGrid
