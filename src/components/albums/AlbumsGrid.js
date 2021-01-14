import AlbumCard from './AlbumCard';

const AlbumsGrid = ({ albums }) => {
	if (!albums.length) {
		return <p className="my-6">You haven't created any albums yet.</p>
	}
	return (
		<div className="columns is-multiline mt-2 mb-6" data-testid="albums-grid">
			{albums.map((album, index) =>
				<article className="column is-4-desktop is-3-widescreen" key={index}>
					<AlbumCard album={album} />
				</article>
			)}
		</div>
	)
}

export default AlbumsGrid;
