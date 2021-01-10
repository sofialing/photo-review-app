import { createContext, useContext, useEffect, useState } from 'react'
import { getReviewAlbumById, getPhotosByAlbumId } from '../services/firebase'
import { useAuth } from './AuthContext'

// Create Review Context
const ReviewContext = createContext()
const useReview = () => useContext(ReviewContext)

// Create Review Context Provider
const ReviewContextProvider = ({ children }) => {
	const { authGuest } = useAuth()
	const [reviewId, setReviewId] = useState(null)
	const [album, setAlbum] = useState(null)
	const [photos, setPhotos] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [approved, setApproved] = useState([])
	const [rejected, setRejected] = useState([])

	useEffect(() => authGuest(), [authGuest])

	useEffect(() => {
		if (!reviewId) return;

		getReviewAlbumById(reviewId)
			.then(snapshot => {
				if (!snapshot.empty) {
					setAlbum({
						id: snapshot.docs[0].id,
						...snapshot.docs[0].data()
					})
				} else {
					setError('Oh no! Could not find album.')
				}
			});
	}, [reviewId])

	useEffect(() => {
		if (!album) return;

		const unsubscribe = getPhotosByAlbumId(album.id)
			.onSnapshot(snapshot => {
				setLoading(true)
				const _photos = []

				snapshot.forEach(doc => {
					_photos.push({
						id: doc.id,
						...doc.data(),
					})
				})

				setPhotos(_photos)
				setLoading(false)
			});

		return unsubscribe;

	}, [album])

	/**
	 * Add photo to a list of approved photos
	 *
	 * @param {Oject} photo The approved photo
	 */
	const approvePhoto = photo => {
		// add photo to array of approved photos
		setApproved(prevState => [...prevState, photo])

		// check if rejected includes photo, if so remove it
		if (rejected.some(item => item.id === photo.id)) {
			setRejected(prevState => prevState.filter(item => item.id !== photo.id))
		}
	}

	/**
	 * Add photo to a list of rejected photos
	 *
	 * @param {Object} photo The rejected photo
	 */
	const rejectPhoto = photo => {
		// add photo to array of rejected photos
		setRejected(prevState => [...prevState, photo])

		// check if approved includes photo, if so remove it
		if (approved.some(item => item.id === photo.id)) {
			setApproved(prevState => prevState.filter(item => item.id !== photo.id))
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
