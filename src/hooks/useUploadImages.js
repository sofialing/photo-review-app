import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext'

const useUploadImages = (images, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		console.log('wants to upload images:', images)
		if (!images) {
			setUploadProgress(null);
			setError(null);
			setIsSuccess(false);

			return;
		};

		setError(null);
		setIsSuccess(false);

		const promises = []

		images.forEach(image => {
			const fileRef = storage.ref(`images/${user.uid}/${image.name}`)
			const uploadTask = fileRef.put(image)
			promises.push(uploadTask)

			uploadTask.on('state_changed', taskSnapshot => {
				setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			});

			uploadTask.then(async snapshot => {

				// get URL to uploaded image
				const url = await snapshot.ref.getDownloadURL()

				const img = {
					name: image.name,
					owner_id: user.uid,
					path: snapshot.ref.fullPath,
					size: image.size,
					type: image.type,
					url
				}

				// get docRef to album
				if (albumId) {
					img.album = db.collection('albums').doc(albumId)
				}

				// add image to collection
				await db.collection('images').add(img)

			}).catch(error => setError(error.message));
		})
		Promise.all(promises)
			.then(() => {
				console.log('All files uploaded')
				setIsSuccess(true)
				setUploadProgress(null)
			})
			.catch(err => console.log(err.code));

	}, [albumId, images, user.uid])

	return { uploadProgress, error, isSuccess };
}

export default useUploadImages
