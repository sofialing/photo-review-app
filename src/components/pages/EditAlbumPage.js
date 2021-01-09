import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import EditAlbumForm from '../albums/EditAlbumForm'
import Notification from '../partials/Notification'
import { updateAlbumTitle } from '../../helpers'
import imageSrc from '../../assets/images/create-album.png'

const EditAlbumPage = () => {
	const navigate = useNavigate()
	const { albumId } = useParams()
	const { album } = useAlbum(albumId)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const onSaveAlbum = async newTitle => {
		// check album title, return if it's the same as the current one
		if (newTitle === album.title) {
			return setError('Enter a name that is not the same as the current one.')
		}
		// reset error
		setError(false)

		try {
			setLoading(true)
			await updateAlbumTitle(albumId, newTitle)
			navigate(`/albums/${albumId}`)
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<section className="section">
			<div className="container">
				<div className="columns is-vcentered">
					<div className="column is-4">
						<div className="card">
							<div className="card-content">
								<h1 className="title">Edit album</h1>
								{<EditAlbumForm onSaveAlbum={onSaveAlbum} album={album} loading={loading} />}
								{error && <Notification message={error} setMessage={setError} type="danger" />}
							</div>
						</div>
					</div>
					<div className="column is-5 is-offset-1">
						<figure className="image is-square">
							<img src={imageSrc} alt="" />
						</figure>
					</div>
				</div>
			</div>
		</section>
	)
}

export default EditAlbumPage
