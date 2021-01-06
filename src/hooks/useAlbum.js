import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState(null)
	const [photos, setPhotos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		db.collection('albums').doc(albumId).get().then(doc => {
			setAlbum({
				id: doc.id,
				...doc.data()
			})
			console.log(album)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId])

	useEffect(() => {
		const unsubscribe = db.collection('photos')
			.where('album', '==', db.collection('albums').doc(albumId))
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId])

	return { album, photos, loading }
}

export default useAlbum
