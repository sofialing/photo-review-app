import useAlbums from '../hooks/useAlbums';
import AlbumsGrid from '../components/albums/AlbumsGrid';
import CreateAlbumButton from '../components/partials/CreateAlbumButton';
import Spinner from '../components/partials/Spinner';

const Albums = () => {
	const { albums, loading } = useAlbums();

	return (
		<>
			<header className="is-flex is-justify-content-space-between">
				<h1 className="title is-1">Albums</h1>
				<CreateAlbumButton />
			</header>
			{loading ? <Spinner /> : <AlbumsGrid albums={albums} />}
		</>
	)
}

export default Albums;
