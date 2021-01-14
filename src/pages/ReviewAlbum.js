import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReview } from '../contexts/ReviewContext';
import PhotosGrid from '../components/albums/PhotosGrid';
import ReviewCompleted from '../components/review/ReviewCompleted';
import ReviewDetails from '../components/review/ReviewDetails';
import AlbumNotFound from '../components/partials/AlbumNotFound';
import Notification from '../components/partials/Notification';
import Spinner from '../components/partials/Spinner';

const ReviewAlbum = () => {
	const { reviewId } = useParams();
	const { album, photos, loading, error, approved, rejected, setReviewId, submitReview } = useReview();
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
			await submitReview(approved);

			// mark as completed and delete guest user from Firebase
			setCompleted(true);

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
	if (loading) {
		return (
			<Spinner />
		)
	}

	return (
		<>
			<header className="review-album-header">
				<h1 className="title">Photo Review</h1>
				{!loading && <p className="subtitle">{album.title} &middot; {photos.length} photos by {album.ownerName}</p>}
			</header>
			<PhotosGrid photos={photos} reviewMode={true} />
			<ReviewDetails onSubmit={onSubmit} />
			{notification && <Notification message={notification} setMessage={setNotification} />}
		</>
	)
}

export default ReviewAlbum;
