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
		setRejected(true)
		setApproved(false)
		rejectPhoto(photo)
		// setRejected(prevState => !prevState)
		// setApproved(false)
		// rejectPhoto(photo)
	}
	const onApprove = () => {
		if (approved) return
		setApproved(true)
		setRejected(false)
		approvePhoto(photo)
		// setApproved(prevState => !prevState)
		// setRejected(false)
		// approvePhoto(photo)
	}

	return (
		<footer className="card-footer">
			<div className="card-footer-item">
				<FontAwesomeIcon
					className={rejected ? 'is-active' : ''}
					icon={faThumbsDown}
					onClick={onReject}
					title="Reject"
				/>
			</div>
			<div className="card-footer-item">
				<FontAwesomeIcon
					className={approved ? 'is-active' : ''}
					icon={faThumbsUp}
					onClick={onApprove}
					title="Approve"
				/>
			</div>
		</footer>
	)
}

export default ReviewPhoto
