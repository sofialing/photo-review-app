import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import ImagesGrid from './ImagesGrid'
import UploadImages from './UploadImages'
import ButtonGroup from './ButtonGroup'

const SingleAlbum = () => {
	const { albumId } = useParams()
	const { album, images } = useAlbum(albumId)

	return album && images && (
		<div className="container">
			<header className="is-flex is-justify-content-space-between">
				<div>
					<h1 className="title">{album.title}</h1>
					<p className="subtitle">{images.length} images</p>
				</div>
				<ButtonGroup />
			</header>
			<ImagesGrid images={images} />
			<UploadImages albumId={albumId} />
		</div>
	)
}

export default SingleAlbum
