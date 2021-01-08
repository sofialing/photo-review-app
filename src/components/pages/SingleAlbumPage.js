import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import PhotosGrid from '../albums/PhotosGrid'
import UploadPhotos from '../albums/UploadPhotos'
import ButtonGroup from '../albums/ButtonGroup'
import Spinner from '../partials/Spinner'

const SingleAlbumPage = () => {
	const { albumId } = useParams()
	const { album, photos, loading } = useAlbum(albumId)

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
			<PhotosGrid photos={photos} />
			<ButtonGroup albumId={albumId} />
			<UploadPhotos albumId={albumId} />
		</section>
	)
}

export default SingleAlbumPage
