/**
 * useAlbum Hook
 */
import { useEffect, useState } from 'react'
import { getAlbumById, getPhotosByAlbumId, getPhotosSnaphot } from '../services/firebase'
import { useAuth } from '../contexts/AuthContext'

const useAlbum = (albumId) => {
	const { user } = useAuth()
	const [album, setAlbum] = useState(null)
	const [photos, setPhotos] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		getAlbumById(albumId)
			.then(snapshot => {
				// check if album exists and belongs to user
				if (snapshot.exists && snapshot.data().owner_id === user.uid) {
					setAlbum({
						id: snapshot.id,
						...snapshot.data()
					})
				} else {
					setError('Oh no! Could not find album.')
				}
			})
			.catch(error => {
				setError(error.message)
			})
	}, [albumId, user.uid])

	useEffect(() => {
		if (!album) return

		const unsubscribe = getPhotosSnaphot(albumId)
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
	}, [album, albumId])

	return { album, photos, loading, error }
}

export default useAlbum
