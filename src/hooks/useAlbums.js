/**
 * useAlbum Hook
 */
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'


const useAlbums = () => {
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)
	const { user } = useAuth()

	useEffect(() => {
		const unsubscribe = db.collection('albums')
			.where('owner_id', '==', user.uid)
			.orderBy('title')
			.onSnapshot(snapshot => {
				setLoading(true)
				const _albums = []
				snapshot.forEach(doc => {
					_albums.push({ id: doc.id, ...doc.data() })
				})
				setAlbums(_albums)
				setLoading(false)
			})
		return unsubscribe
	}, [user.uid])

	return { albums, loading }

}

export default useAlbums
