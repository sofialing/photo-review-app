import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { useReview } from '../../contexts/ReviewContext'

const ReviewPhoto = ({ photo }) => {
	const [approved, setApproved] = useState(false)
	const [rejected, setRejected] = useState(false)
	const { approvePhoto, rejectPhoto } = useReview()

	const onReject = () => {
		if (rejected) return

		setApproved(false)
		setRejected(true)

		// add photo to array of rejected photos
		rejectPhoto(photo)
	}

	const onApprove = () => {
		if (approved) return

		setRejected(false)
		setApproved(true)

		// add photo to array of approved photos
		approvePhoto(photo)
	}

	return (
		<footer className="card-footer">
			<div className="card-footer-item">
				<FontAwesomeIcon
					className={rejected ? 'is-active' : ''}
					icon={faThumbsDown}
					onClick={onReject}
					size="lg"
					title="Reject photo"
				/>
			</div>
			<div className="card-footer-item">
				<FontAwesomeIcon
					className={approved ? 'is-active' : ''}
					icon={faThumbsUp}
					onClick={onApprove}
					size="lg"
					title="Approve photo"
				/>
			</div>
		</footer>
	)
}

export default ReviewPhoto
