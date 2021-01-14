import { createContext, useContext, useEffect, useState } from 'react';
import { addPhoto, createAlbum, getPhotosSnaphot, searchAlbums, updateAlbum } from '../services/firebase';

// Create Review Context
const ReviewContext = createContext();
const useReview = () => useContext(ReviewContext);

// Create Review Context Provider
const ReviewContextProvider = ({ children }) => {
	const [album, setAlbum] = useState(null);
	const [approved, setApproved] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [photos, setPhotos] = useState([]);
	const [rejected, setRejected] = useState([]);
	const [reviewId, setReviewId] = useState(null);

	useEffect(() => {
		if (!reviewId) {
			return;
		}

		// get album by review id
		searchAlbums('reviewId', reviewId)
			.then(snapshot => {
				if (snapshot.empty) {
					return setError('Oh no! Could not find album.');
				} else if (snapshot.docs[0].data().reviewed) {
					return setError('Oh no! This album has already been reviewed.');
				}
				setAlbum({
					id: snapshot.docs[0].id,
					...snapshot.docs[0].data()
				});
			});

	}, [reviewId])

	useEffect(() => {
		if (!album) {
			return;
		}

		// get photos snapshot and listen for changes
		const unsubscribe = getPhotosSnaphot(album.id, {
			next: snapshot => {
				setLoading(true);
				const _photos = [];

				snapshot.forEach(doc => {
					_photos.push({ id: doc.id, ...doc.data() });
				});

				setPhotos(_photos);
				setLoading(false);
			},
			error: () => {
				setError('Oh no! Something went wrong, try again.');
				setLoading(false);
			}
		});

		return unsubscribe;

	}, [album])

	/**
	 * Add photo to a list of approved photos
	 */
	const approvePhoto = (photo) => {
		// add photo to array of approved photos
		setApproved(prevState => [...prevState, photo]);

		// check if rejected includes photo, if so remove it
		if (rejected.some(item => item.id === photo.id)) {
			setRejected(prevState => {
				return prevState.filter(item => item.id !== photo.id);
			});
		}
	}

	/**
	 * Add photo to a list of rejected photos
	 */
	const rejectPhoto = (photo) => {
		// add photo to array of rejected photos
		setRejected(prevState => [...prevState, photo]);

		// check if approved includes photo, if so remove it
		if (approved.some(item => item.id === photo.id)) {
			setApproved(prevState => {
				return prevState.filter(item => item.id !== photo.id);
			});
		}
	}
	/**
	 * Submit approved photos and create new album
	 */
	const submitReview = async () => {
		const currentTime = new Date().toISOString().slice(0, 10);
		const title = `${album.title}_review_${currentTime}`;

		try {
			// create new album with approved photos
			const albumRef = await createAlbum(title, {
				uid: album.ownerId,
				displayName: album.ownerName
			});

			approved.forEach(async photo => {
				const _photo = { ...photo, album: albumRef };
				delete _photo.id;

				await addPhoto(_photo);
			});

			// mark album as reviewed
			await updateAlbum(album.id, { reviewed: true });

		} catch (error) {
			setError(error.message);
		}
	}

	const contextValues = {
		album,
		approved,
		approvePhoto,
		error,
		loading,
		photos,
		rejected,
		rejectPhoto,
		reviewId,
		setReviewId,
		submitReview,
	}

	return (
		<ReviewContext.Provider value={contextValues}>
			{children}
		</ReviewContext.Provider>
	)
}

export { useReview, ReviewContext, ReviewContextProvider as default }
