import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadImages from '../../hooks/useUploadImages'

const fileTypes = 'image/gif, image/jpeg, image/png'

const UploadImages = ({ albumId }) => {
	const [images, setImages] = useState(null)
	const [notification, setNotification] = useState(null)
	const { uploadProgress, error, isSuccess } = useUploadImages(images, albumId);

	useEffect(() => {
		if (error) {
			setNotification(error)
		}
		if (isSuccess) {
			setNotification('Image(s) successfully uploaded to album.')
			setImages(null)
		}
	}, [error, isSuccess])

	const onDrop = useCallback(acceptedFiles => {
		setNotification(null)

		if (acceptedFiles.length) {
			setImages(acceptedFiles)
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
					? <p>Drop the files here ...</p>
					: <p>Drag 'n' drop some files here, or click to select files</p>
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

export default UploadImages
