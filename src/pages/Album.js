import moment from 'moment';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createAlbum, addPhoto } from '../services/firebase';
import useAlbum from '../hooks/useAlbum';
import PhotosGrid from '../components/albums/PhotosGrid';
import UploadPhotos from '../components/albums/UploadPhotos';
import ButtonGroup from '../components/albums/ButtonGroup';
import Spinner from '../components/partials/Spinner';
import AlbumNotFound from '../components/partials/AlbumNotFound';

const Album = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { albumId } = useParams();
	const { album, photos, loading, error } = useAlbum(albumId);
	const [selectedPhotos, setSelectedPhotos] = useState([]);

	const onCopyPhotos = async () => {
		try {
			// create new album and add photos to it
			const albumRef = await createAlbum(`${album.title}_copy`, user);
			selectedPhotos.forEach(async photo => {
				await addPhoto({ ...photo, album: albumRef });
			})
			// redirect to new album
			navigate(`/albums/${albumRef.id}`)
		} catch (error) {
			console.log(error.message)
		}
	}

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
					<h1 className="title is-1">{album.title}</h1>
					<p className="subtitle">
						{photos.length} {photos.length === 1 ? 'photo' : 'photos'} &middot;
						{album.updatedAt
							? ` Updated  ${moment(album.updatedAt).from()}`
							: ` Created ${moment(album.createdAt).from()}`
						}
					</p>
				</div>
				<ButtonGroup hasPhotos={photos.length} hasSelectedPhotos={1} onCopyPhotos={onCopyPhotos} />
			</header>
			<PhotosGrid photos={photos} setSelectedPhotos={setSelectedPhotos} />
			<UploadPhotos albumId={albumId} />
		</>
	)
}

export default Album;
