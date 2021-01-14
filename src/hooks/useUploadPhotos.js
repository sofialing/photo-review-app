/**
 * Custom hook to upload photos to album
 */
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import { getAlbumRef, addPhoto, updateAlbum } from '../services/firebase'

const useUploadPhotos = (photos, albumId) => {
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [progress, setProgress] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		if (!photos) {
			setProgress(null);
			setError(null);
			setIsSuccess(false);

			return;
		};

		setError(null);
		setIsSuccess(false);

		// calculate total bytes of photos to upload
		let bytesTransferred = 0;
		const photosTotalBytes = photos
			.map(photo => photo.size)
			.reduce((total, size) => total + size);

		const promises = [];

		photos.forEach(photo => {
			const fileRef = storage.ref(`photos/${photo.name}`);

			// start upload task and push to promises array
			const uploadTask = fileRef.put(photo);
			promises.push(uploadTask);

			// track upload progress
			let photosTotalBytesTransferred = 0
			uploadTask.on('state_changed', taskSnapshot => {
				bytesTransferred += taskSnapshot.bytesTransferred - photosTotalBytesTransferred;
				photosTotalBytesTransferred = taskSnapshot.bytesTransferred;
				setProgress(Math.round((bytesTransferred / photosTotalBytes) * 100));
			});

			uploadTask.then(async snapshot => {
				// get URL to uploaded photo
				const url = await snapshot.ref.getDownloadURL();

				// create photo object
				const _photo = {
					album: getAlbumRef(albumId),
					name: photo.name,
					ownerId: user.uid,
					path: snapshot.ref.fullPath,
					size: photo.size,
					type: photo.type,
					url
				};

				// add photo to Firestore collection
				await addPhoto(_photo);

			}).catch(error => {
				setError(error.message)
			});
		})
		Promise.all(promises)
			.then(() => {
				setIsSuccess(true);
				setProgress(null);
				updateAlbum(albumId, { updatedAt: Date.now() });
			})
			.catch(error => {
				setError(error.message);
			});

	}, [albumId, photos, user])

	return { error, isSuccess, progress };
}

export default useUploadPhotos;
