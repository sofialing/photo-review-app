import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createNewAlbum } from '../../helpers'
import useAlbum from '../../hooks/useAlbum'
import PhotosGrid from '../albums/PhotosGrid'
import UploadPhotos from '../albums/UploadPhotos'
import ButtonGroup from '../albums/ButtonGroup'
import Spinner from '../partials/Spinner'

const SingleAlbumPage = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { albumId } = useParams()
	const { album, photos, loading } = useAlbum(albumId)
	const [selectedPhotos, setSelectedPhotos] = useState([])

	const onCopyPhotos = async () => {
		const albumRef = await createNewAlbum(selectedPhotos, album.title, user)
		navigate(`/albums/${albumRef.id}`)
	}

	if (loading) {
		return (
			<section className="album-page container">
				<Spinner />
			</section>
		)
	}

	return (
		<section className="album-page container">
			<header>
				<h1 className="title is-capitalized">{album.title}</h1>
				<p className="subtitle">{photos.length} {photos.length === 1 ? 'photo' : 'photos'}</p>
			</header>
			<PhotosGrid photos={photos} setSelectedPhotos={setSelectedPhotos} />
			<ButtonGroup selectedPhotos={selectedPhotos} onCopyPhotos={onCopyPhotos} />
			<UploadPhotos albumId={albumId} />
		</section>
	)
}

export default SingleAlbumPage
