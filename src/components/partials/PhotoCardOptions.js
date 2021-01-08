import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClone } from '@fortawesome/free-solid-svg-icons'
import { deletePhoto } from '../../helpers'

const PhotoCardOptions = ({ photo, selectPhoto }) => {
	const [selected, setSelectedPhotos] = useState(false)

	const onSelectPhoto = () => {
		if (selected) {
			console.log('remove photo')
			// remove photo from array of selected photos
			selectPhoto(prevState => prevState.filter(item => item.id !== photo.id))
			setSelectedPhotos(false)
			return;
		}

		// add photo to array of selected photos
		selectPhoto(prevState => [...prevState, photo])
		setSelectedPhotos(true)
	}

	const onDeletePhoto = async () => {
		if (selected) return;
		await deletePhoto(photo.id, photo.path)
	}
	return (
		<footer className="card-footer">
			<div className="card-footer-item">
				<FontAwesomeIcon
					className={selected ? 'is-active' : ''}
					icon={faClone}
					onClick={onSelectPhoto}
					title="Copy photo to new album"
				/>
			</div>
			<div className="card-footer-item">
				<FontAwesomeIcon
					className={selected ? 'is-disabled' : ''}
					icon={faTrash}
					onClick={onDeletePhoto}
					title="Remove photo from album"
				/>
			</div>
		</footer>
	)
}

export default PhotoCardOptions
