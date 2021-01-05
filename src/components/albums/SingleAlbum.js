import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import ImagesGrid from './ImagesGrid'
import UploadImages from './UploadImages'

const SingleAlbum = () => {
	const { albumId } = useParams()
	const { album, images } = useAlbum(albumId)

	return album && images && (
		<div className="container">
			<h1 className="title">{album.title}</h1>
			<p className="subtitle">{images.length} images, 0 selected</p>
			<ImagesGrid images={images} />
			<UploadImages albumId={albumId} />
		</div>
	)
}

export default SingleAlbum
