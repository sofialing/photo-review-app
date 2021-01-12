/**
 * useAlbum Hook
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAlbumsSnapshot } from '../services/firebase';

const useAlbums = () => {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const unsubscribe = getAlbumsSnapshot(user.uid)
			.onSnapshot(snapshot => {
				setLoading(true)
				const tempAlbums = []
				snapshot.forEach(doc => {
					tempAlbums.push({
						id: doc.id,
						...doc.data()
					});
				})
				setAlbums(tempAlbums);
				setLoading(false);
			})

		return unsubscribe;
	}, [user.uid])

	return { albums, loading }

}

export default useAlbums
