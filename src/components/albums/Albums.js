import React from 'react'
import { Link } from 'react-router-dom'
import useAlbums from '../../hooks/useAlbums'
import imageFolder from '../../assets/images/image-folder.png'

const Albums = () => {
	const { albums } = useAlbums()

	return (
		<div className="container">
			<h1 className="title">All Albums</h1>
			<div className="columns">
				{albums && albums.map((album, index) =>
					<div className="column" key={index}>
						<div className="card">
							<div className="card-image">
								<figure className="image">
									<Link to={album.id}>
										<img src={imageFolder} alt="" />
									</Link>
								</figure>
							</div>
							<div className="card-content">
								<Link to={album.id}>
									<h2 className="title">{album.title}</h2>
								</Link>
							</div>
							<footer className="card-footer">
								<Link to={`${album.id}/edit`} className="card-footer-item">Edit</Link>
								<Link to={`${album.id}/delete`} className="card-footer-item">Delete</Link>
							</footer>
						</div>
					</div>
				)}
			</div>
			<Link className="button is-primary" to="/albums/create">Create album</Link>
		</div>
	)
}

export default Albums
