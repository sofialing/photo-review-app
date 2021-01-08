import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteAlbum } from '../../helpers'
import useAlbum from '../../hooks/useAlbum'
import Notification from '../partials/Notification'

const DeleteAlbumPage = () => {
	const navigate = useNavigate()
	const { albumId } = useParams()
	const { album } = useAlbum(albumId)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const onDeleteAlbum = async () => {
		setError(false)

		try {
			setLoading(true)
			// delete album and navigate to albums page
			await deleteAlbum(albumId)
			navigate('/albums')
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	const onCancel = () => {
		// go back to previous page
		navigate(-1)
	}

	return album && (
		<section className="container">
			<div className="card">
				<div className="card-content">
					<h1 className="title">Delete album</h1>
					<p>Are you sure you want to delete the album <em>"{album.title}"</em> and its photos?</p>
					<div className="field is-grouped mt-5">
						<div className="control">
							<button className="button is-primary is-outlined" disabled={loading} onClick={onCancel}>Cancel</button>
						</div>
						<div className="control">
							<button className="button is-primary" disabled={loading} onClick={onDeleteAlbum}>Delete</button>
						</div>
					</div>
					{error && <Notification message={error} setMessage={setError} type="danger" />}
				</div>
			</div>
		</section>
	)
}

export default DeleteAlbumPage
