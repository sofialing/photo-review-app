import { SRLWrapper } from 'simple-react-lightbox';
import PhotoCard from './PhotoCard';

const options = {
	buttons: {
		showDownloadButton: false
	}
}

const PhotosGrid = ({ photos, setSelectedPhotos, reviewMode = false }) => {
	if (!photos.length) {
		return <p className="my-6">You haven't uploaded any photos to album yet.</p>
	}

	return (
		<SRLWrapper options={options}>
			<div className="columns is-multiline mt-4 mb-6">
				{photos.map((photo, index) => (
					<article className="column is-4-desktop is-3-widescreen" key={index}>
						<PhotoCard photo={photo} setSelectedPhotos={setSelectedPhotos} reviewMode={reviewMode} />
					</article>
				))}
			</div>
		</SRLWrapper>
	)
}

export default PhotosGrid;
