import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import { getAlbumRef, addPhoto } from '../services/firebase'

const useUploadPhotos = (photos, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		if (!photos) {
			setUploadProgress(null);
			setError(null);
			setIsSuccess(false);

			return;
		};

		setError(null);
		setIsSuccess(false);

		const promises = []

		photos.forEach(photo => {
			const fileRef = storage.ref(`photos/${photo.name}`)
			const uploadTask = fileRef.put(photo)
			promises.push(uploadTask)

			uploadTask.on('state_changed', taskSnapshot => {
				setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			});

			uploadTask.then(async snapshot => {

				// get URL to uploaded photo
				const url = await snapshot.ref.getDownloadURL()

				const _photo = {
					name: photo.name,
					owner_id: user.uid,
					path: snapshot.ref.fullPath,
					size: photo.size,
					type: photo.type,
					url
				}

				// get docRef to album
				if (albumId) {
					_photo.album = getAlbumRef(albumId)
				}

				// add photo to collection
				await addPhoto(_photo)

			}).catch(error => setError(error.message));
		})
		Promise.all(promises)
			.then(() => {
				setIsSuccess(true)
				setUploadProgress(null)
			})
			.catch(err => console.log(err.code));

	}, [albumId, photos, user.uid])

	return { uploadProgress, error, isSuccess };
}

export default useUploadPhotos
