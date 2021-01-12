import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faClone } from '@fortawesome/free-solid-svg-icons';
import { deletePhoto, updateAlbum } from '../../services/firebase';

const PhotoCardOptions = ({ photo, selectPhoto }) => {
	const [selected, setSelected] = useState(false);

	const onSelectPhoto = () => {
		// check if the photo is already selected, if so remove it from the array
		if (selected) {
			selectPhoto(prevState => {
				return prevState.filter(item => item.id !== photo.id);
			})
			setSelected(false);
			return;
		}

		// add photo to array of selected photos
		selectPhoto(prevState => [...prevState, photo]);
		setSelected(true);
	}

	const onDeletePhoto = async () => {
		// check if the photo is selected, if so return
		if (selected) {
			return;
		}

		// delete photo and update album
		try {
			await deletePhoto(photo.id, photo.path);
			await updateAlbum(photo.album.id, { updatedAt: Date.now() });
		} catch (error) {
			console.log(error.message);
		}
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

export default PhotoCardOptions;
