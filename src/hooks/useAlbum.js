import { useEffect, useState } from 'react'
import { getAlbumById, getPhotosByAlbumId } from '../services/firebase'

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState(null)
	const [photos, setPhotos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getAlbumById(albumId)
			.then(album => setAlbum({ id: album.id, ...album.data() }))
			.catch(error => console.log(error))
	}, [albumId])

	useEffect(() => {
		const unsubscribe = getPhotosByAlbumId(albumId)
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
	}, [albumId])

	return { album, photos, loading }
}

export default useAlbum
