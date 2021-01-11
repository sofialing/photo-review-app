import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClone } from '@fortawesome/free-solid-svg-icons'
import { deletePhoto, setAlbumUpdated } from '../../services/firebase'

const PhotoCardOptions = ({ photo, selectPhoto, albumId }) => {
	const [selected, setSelectedPhotos] = useState(false)

	const onSelectPhoto = () => {
		// check if the photo is already selected, if so remove it from the array
		if (selected) {
			setSelectedPhotos(false)
			selectPhoto(prevState => {
				prevState.filter(item => item.id !== photo.id)
			})
			return
		}

		// add photo to array of selected photos
		selectPhoto(prevState => [...prevState, photo])
		setSelectedPhotos(true)
	}

	const onDeletePhoto = async () => {
		// check if the photo is selected, if so return
		if (selected) {
			return
		}

		// delete photo and update album
		await deletePhoto(photo.id, photo.path)
		await setAlbumUpdated(photo.album.id)
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
