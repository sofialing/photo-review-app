import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useReview = (review_id) => {
	const [album, setAlbum] = useState(null)
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		console.log(review_id)
		db.collection('albums')
			.where('review_id', '==', review_id).get()
			.then(snapshot => {
				if (!snapshot.empty) {
					setAlbum({
						id: snapshot.docs[0].id,
						...snapshot.docs[0].data()
					})
				} else {
					setError('Could not find album.')
				}
			});

	}, [review_id])

	useEffect(() => {
		if (!album) return;

		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(album.id))
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

	}, [album])

	return { album, images, loading, error }
}

export default useReview
