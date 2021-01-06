import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadPhotos from '../../hooks/useUploadPhotos'

const fileTypes = 'image/gif, image/jpeg, image/png'

const UploadPhotos = ({ albumId }) => {
	const [photos, setPhotos] = useState(null)
	const [notification, setNotification] = useState(null)
	const { uploadProgress, error, isSuccess } = useUploadPhotos(photos, albumId);

	useEffect(() => {
		if (error) {
			setNotification(error)
		}
		if (isSuccess) {
			setNotification('Photo(s) successfully uploaded to album.')
			setPhotos(null)
		}
	}, [error, isSuccess])

	const onDrop = useCallback(acceptedFiles => {
		setNotification(null)

		if (acceptedFiles.length) {
			setPhotos(acceptedFiles)
		}
	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
	} = useDropzone({ accept: fileTypes, onDrop })

	return (
		<section className="my-6">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				{isDragActive
					? <p>Drop the photos here ...</p>
					: <p>Drag 'n' drop photos here, or click to select photos</p>
				}
			</div>
			{uploadProgress !== null && (
				<progress className="progress is-primary my-5" value={uploadProgress} max="100"></progress>
			)}
			{notification && (
				<div className={`notification my-5 ${error ? 'is-danger' : 'is-success'}`}>
					<button className="delete" onClick={() => setNotification(null)}></button>
					{notification}
				</div>
			)}
		</section>
	)
}

export default UploadPhotos
