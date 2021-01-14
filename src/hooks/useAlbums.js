/**
 * Custom hook to get multiple albums
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAlbumsSnapshot } from '../services/firebase';

const useAlbums = () => {
	const [albums, setAlbums] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		// get albums by user ID and listen for changes
		const unsubscribe = getAlbumsSnapshot(user.uid, {
			next: snapshot => {
				setLoading(true);
				const _albums = [];

				snapshot.forEach(doc => {
					_albums.push({ id: doc.id, ...doc.data() });
				})

				setAlbums(_albums);
				setLoading(false);
			},
			error: (error) => {
				console.error(error.message)
				setError('Oh no! Something went wrong, try again.');
				setLoading(false);
			}
		});

		return unsubscribe;

	}, [user])

	return { albums, error, loading }

}

export default useAlbums;
