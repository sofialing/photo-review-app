import moment from 'moment'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createAlbum, addPhoto } from '../../services/firebase'
import useAlbum from '../../hooks/useAlbum'
import PhotosGrid from '../albums/PhotosGrid'
import UploadPhotos from '../albums/UploadPhotos'
import ButtonGroup from '../albums/ButtonGroup'
import Spinner from '../partials/Spinner'
import AlbumNotFound from '../partials/AlbumNotFound'

const SingleAlbumPage = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { albumId } = useParams()
	const { album, photos, loading, error } = useAlbum(albumId)
	const [selectedPhotos, setSelectedPhotos] = useState([])

	const onCopyPhotos = async () => {
		try {
			// create new album and add photos to it
			const albumRef = await createAlbum(`${album.title}_copy`, user)
			selectedPhotos.forEach(async photo => (
				await addPhoto({ ...photo, album: albumRef }))
			)
			// redirect to new album
			navigate(`/albums/${albumRef.id}`)
		} catch (error) {
			console.log(error.message)
		}
	}

	if (loading) {
		return (
			<section className="album-page section">
				<div className="container">
					<Spinner />
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<AlbumNotFound message={error} />
		)
	}

	return (
		<section className="album-page section">
			<div className="container">
				<header className="is-flex is-justify-content-space-between">
					<div>
						<h1 className="title is-1 is-capitalized">{album.title}</h1>
						<p className="subtitle">
							{photos.length} {photos.length === 1 ? 'photo' : 'photos'} &middot;
							{album.updated ? ` Updated  ${moment(album.updated).from()}` : ` Created ${moment(album.created).from()}`}
						</p>
					</div>
					<ButtonGroup photos={photos} selectedPhotos={selectedPhotos} onCopyPhotos={onCopyPhotos} />
				</header>
				<PhotosGrid photos={photos} setSelectedPhotos={setSelectedPhotos} />
				<UploadPhotos albumId={albumId} />
			</div>
		</section>
	)
}

export default SingleAlbumPage
