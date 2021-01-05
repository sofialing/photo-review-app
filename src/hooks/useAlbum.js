import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState(null)
	const [images, setImages] = useState([])
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
		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			.onSnapshot(snapshot => {
				setLoading(true)
				const _images = []

				snapshot.forEach(doc => {
					_images.push({
						id: doc.id,
						...doc.data(),
					})
				})

				setImages(_images)
				setLoading(false)
			});

		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId])

	return { album, images, loading }
}

export default useAlbum
