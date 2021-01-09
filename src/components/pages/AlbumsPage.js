import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from '../albums/AlbumsGrid'
import CreateAlbumButton from '../partials/CreateAlbumButton'
import Spinner from '../partials/Spinner'

const AlbumsPage = () => {
	const { albums, loading } = useAlbums()

	return (
		<section className="albums-page section">
			<div className="container">
				<header>
					<h1 className="title is-1">Albums</h1>
					<CreateAlbumButton />
				</header>
				{loading ? <Spinner /> : <AlbumsGrid albums={albums} />}
			</div>
		</section>
	)
}

export default AlbumsPage
