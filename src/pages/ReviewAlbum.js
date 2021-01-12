import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useReview } from '../contexts/ReviewContext';
import { createReviewedAlbum } from '../services/firebase';
import PhotosGrid from '../components/albums/PhotosGrid';
import ReviewCompleted from '../components/review/ReviewCompleted';
import ReviewDetails from '../components/review/ReviewDetails';
import AlbumNotFound from '../components/partials/AlbumNotFound';
import Notification from '../components/partials/Notification';

const ReviewAlbum = () => {
	const { removeGuest } = useAuth();
	const { reviewId } = useParams();
	const { album, photos, loading, error, approved, rejected, setReviewId } = useReview();
	const [notification, setNotification] = useState(null);
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		setReviewId(reviewId);
	}, [reviewId, setReviewId])

	const onSubmit = async () => {
		// check if all photos have been reviewed before submitting
		if (approved.length + rejected.length !== photos.length) {
			return setNotification('You must review all photos before submitting.');
		}

		try {
			// create new album with approved photos
			await createReviewedAlbum(approved, album);
			setCompleted(true);
			// delete guest user from Firebase
			await removeGuest();
		} catch (error) {
			setNotification(error.message);
		}
	}

	if (error) {
		return (
			<AlbumNotFound message={error} />
		)
	}

	if (completed) {
		return (
			<ReviewCompleted nrOfPhotos={approved.length} />
		)
	}

	return !loading && (
		<>
			<header>
				<h1 className="title is-1">{album.title}</h1>
				<p className="subtitle">{photos.length} photos by {album.ownerName}</p>
			</header>
			<PhotosGrid photos={photos} reviewMode={true} />
			<ReviewDetails onSubmit={onSubmit} approved={approved} rejected={rejected} />
			{notification && <Notification message={notification} setMessage={setNotification} />}
		</>
	)
}

export default ReviewAlbum;
