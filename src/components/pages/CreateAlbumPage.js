import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createAlbum } from '../../services/firebase'
import CreateAlbumForm from '../albums/CreateAlbumForm'
import Notification from '../partials/Notification'
import imageSrc from '../../assets/images/upload.png'

const CreateAlbumPage = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const onCreateAlbum = async (title) => {
		setError(false)
		setLoading(true)

		try {
			const albumRef = await createAlbum(title, user)
			navigate(`/albums/${albumRef.id}`)
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
								<h1 className="title">New album</h1>
								<CreateAlbumForm onCreateAlbum={onCreateAlbum} loading={loading} />
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

export default CreateAlbumPage
