import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewLink } from '../../helpers'
import ShareAlbumForm from '../albums/ShareAlbumForm'

const ShareAlbumPage = () => {
	const { albumId } = useParams()
	const [link, setLink] = useState(null)

	useEffect(() => {
		getReviewLink(albumId)
			.then(link => setLink(link))
	}, [albumId])

	return (
		<section className="container">
			<div className="card">
				<div className="card-content">
					<h1 className="title">Share Review Link</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
					<ShareAlbumForm link={link} />
				</div>
			</div>
		</section>
	)
}

export default ShareAlbumPage
