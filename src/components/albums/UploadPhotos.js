import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Notification from '../partials/Notification';
import ProgressBar from '../partials/ProgressBar';
import useUploadPhotos from '../../hooks/useUploadPhotos';

const files = 'image/gif, image/jpeg, image/png';

const UploadPhotos = ({ albumId }) => {
	const [photos, setPhotos] = useState(null);
	const [notification, setNotification] = useState(null);
	const { progress, error, isSuccess } = useUploadPhotos(photos, albumId);

	useEffect(() => {
		if (error) {
			setNotification(error);
		}
		if (isSuccess) {
			setPhotos(null);
		}
	}, [error, isSuccess])

	const onDrop = useCallback(acceptedFiles => {
		setNotification(null);

		if (acceptedFiles.length) {
			setPhotos(acceptedFiles);
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: files, onDrop });

	return (
		<section className="my-6">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				{isDragActive
					? <p>Drop the photos here..</p>
					: <p>Drag and drop photos here, or click to select photos</p>
				}
			</div>
			{progress !== null && <ProgressBar progress={progress} />}
			{notification && <Notification message={notification} setMessage={setNotification} />}
		</section>
	)
}

export default UploadPhotos;
