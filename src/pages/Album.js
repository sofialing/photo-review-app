import moment from 'moment';
import { useParams } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import useCopyPhotos from '../hooks/useCopyPhotos';
import PhotosGrid from '../components/albums/PhotosGrid';
import UploadPhotos from '../components/albums/UploadPhotos';
import AlbumOptions from '../components/albums/AlbumOptions';
import AlbumNotFound from '../components/partials/AlbumNotFound';
import Spinner from '../components/partials/Spinner';

const Album = () => {
	const { albumId } = useParams();
	const { album, photos, loading, error } = useAlbum(albumId);
	const { copyToAlbum, selectedPhotos, setSelectedPhotos } = useCopyPhotos(album);

	if (loading) {
		return (
			<Spinner />
		)
	}

	if (error) {
		return (
			<AlbumNotFound message={error} />
		)
	}

	return (
		<>
			<header className="single-album-header">
				<div>
					<h1 className="title">{album.title}</h1>
					<p className="subtitle">
						{photos.length} {photos.length === 1 ? 'photo' : 'photos'} &middot;
						{album.updatedAt
							? ` Updated  ${moment(album.updatedAt).from()}`
							: ` Created ${moment(album.createdAt).from()}`
						}
					</p>
				</div>
				<AlbumOptions hasPhotos={photos.length} hasSelectedPhotos={selectedPhotos.length} onCopyPhotos={copyToAlbum} />
			</header>
			<PhotosGrid photos={photos} setSelectedPhotos={setSelectedPhotos} />
			<UploadPhotos albumId={albumId} />
		</>
	)
}

export default Album;
