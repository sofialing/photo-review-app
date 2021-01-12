import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewLink } from '../services/firebase';
import ShareAlbumForm from '../components/albums/ShareAlbumForm';
import imageSrc from '../assets/images/photos-approved.png';

const ShareAlbum = () => {
	const { albumId } = useParams();
	const [link, setLink] = useState('');

	useEffect(() => {
		getReviewLink(albumId)
			.then(link => {
				setLink(link)
			})
	}, [albumId])

	return (
		<div className="columns is-vcentered">
			<div className="column is-4">
				<div className="card">
					<div className="card-content">
						<h1 className="title">Share Review Link</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
						<ShareAlbumForm link={link} />
					</div>
				</div>
			</div>
			<div className="column is-5 is-offset-1">
				<figure className="image is-square">
					<a href="https://storyset.com" target="_blank" rel="noreferrer" title="Illustration by Freepik Storyset">
						<img src={imageSrc} alt="" />
					</a>
				</figure>
			</div>
		</div>
	)
}

export default ShareAlbum;
