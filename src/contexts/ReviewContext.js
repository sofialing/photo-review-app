import { createContext, useContext, useEffect, useState } from 'react';
import { searchAlbums, getPhotosSnaphot } from '../services/firebase';
import { useAuth } from './AuthContext';

// Create Review Context
const ReviewContext = createContext();
const useReview = () => useContext(ReviewContext);

// Create Review Context Provider
const ReviewContextProvider = ({ children }) => {
	const { authGuest } = useAuth();
	const [album, setAlbum] = useState(null);
	const [approved, setApproved] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [photos, setPhotos] = useState([]);
	const [rejected, setRejected] = useState([]);
	const [reviewId, setReviewId] = useState(null);

	useEffect(() => {
		authGuest()
	}, [authGuest]);

	useEffect(() => {
		if (!reviewId) {
			return;
		}

		// get album by review id
		searchAlbums('reviewId', reviewId)
			.then(snapshot => {
				if (snapshot.empty) {
					return setError('Oh no! Could not find album.');
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

		// listen for photos snapshot
		const unsubscribe = getPhotosSnaphot(album.id)
			.onSnapshot(snapshot => {
				setLoading(true);
				const tempPhotos = [];

				snapshot.forEach(doc => {
					tempPhotos.push({
						id: doc.id,
						...doc.data(),
					})
				})

				setPhotos(tempPhotos);
				setLoading(false);
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

	const contextValues = {
		album,
		photos,
		approved,
		rejected,
		reviewId,
		loading,
		error,
		rejectPhoto,
		approvePhoto,
		setReviewId
	}

	return (
		<ReviewContext.Provider value={contextValues}>
			{children}
		</ReviewContext.Provider>
	)
}

export { useReview, ReviewContext, ReviewContextProvider as default }
