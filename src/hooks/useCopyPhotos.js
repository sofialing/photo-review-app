/**
 * Custom hook to copy photos to new album
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createAlbum, addPhoto } from '../services/firebase';

const useCopyPhotos = (album) => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [selectedPhotos, setSelectedPhotos] = useState([]);

	const copyToAlbum = async () => {
		try {
			// create new album and add photos to it
			const albumRef = await createAlbum(`${album.title}_copy`, user);
			selectedPhotos.forEach(async photo => {
				const _photo = { ...photo, album: albumRef };
				delete _photo.id;

				await addPhoto(_photo);
			})
			setSelectedPhotos([]);
			// redirect user to new album
			navigate(`/albums/${albumRef.id}`)
		} catch (error) {
			console.error(error.message);
		}
	}

	return { copyToAlbum, selectedPhotos, setSelectedPhotos };
}

export default useCopyPhotos;
