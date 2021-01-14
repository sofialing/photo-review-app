/**
 * Custom hook to get an album and its photos
 */
import { useEffect, useState } from 'react';
import { getAlbumSnapshot, getPhotosSnaphot } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';

const useAlbum = (id) => {
	const [album, setAlbum] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [photos, setPhotos] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		// get album snapshot and listen for changes
		const unsubscribe = getAlbumSnapshot(id, {
			next: snapshot => {
				if (snapshot.exists && snapshot.data().ownerId === user.uid) {
					setAlbum({ id: snapshot.id, ...snapshot.data() });
				} else {
					setError('Oh no! Could not find album.');
				}
				setLoading(false);
			},
			error: () => {
				setError('Oh no! Something went wrong, try again.');
				setLoading(false);
			}
		});

		return unsubscribe;

	}, [id, user])

	useEffect(() => {
		if (!album) {
			return;
		}

		// get photos snapshot and listen for changes
		const unsubscribe = getPhotosSnaphot(id, {
			next: snapshot => {
				setLoading(true);
				const _photos = [];

				snapshot.forEach(doc => {
					_photos.push({ id: doc.id, ...doc.data() });
				});

				setPhotos(_photos);
				setLoading(false);
			},
			error: () => {
				setError('Oh no! Something went wrong, try again.');
				setLoading(false);
			}
		});

		return unsubscribe;

	}, [album, id])

	return { album, error, loading, photos }
}

export default useAlbum;
