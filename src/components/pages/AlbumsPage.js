import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from '../albums/AlbumsGrid'
import CreateAlbumButton from '../partials/CreateAlbumButton'
import Spinner from '../partials/Spinner'

const AlbumsPage = () => {
	const { albums, loading } = useAlbums()

	return (
		<section className="albums-page container">
			<header>
				<h1 className="title">Albums</h1>
				<CreateAlbumButton />
			</header>
			{loading ? <Spinner /> : <AlbumsGrid albums={albums} />}
		</section>
	)
}

export default AlbumsPage
