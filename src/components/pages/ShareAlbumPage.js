import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewLink } from '../../services/firebase'
import ShareAlbumForm from '../albums/ShareAlbumForm'
import imageSrc from '../../assets/images/photos-approved.png'

const ShareAlbumPage = () => {
	const { albumId } = useParams()
	const [link, setLink] = useState('')

	useEffect(() => {
		(async () => {
			const link = await getReviewLink(albumId)
			setLink(link)
		})()
	}, [albumId])

	return (
		<section className="section">
			<div className="container">
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
							<img src={imageSrc} alt="" />
						</figure>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShareAlbumPage
