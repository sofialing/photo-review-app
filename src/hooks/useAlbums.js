/**
 * useAlbum Hook
 */
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getAlbumByOwnerId } from '../services/firebase'

const useAlbums = () => {
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)
	const { user } = useAuth()

	useEffect(() => {
		const unsubscribe = getAlbumByOwnerId(user.uid)
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
