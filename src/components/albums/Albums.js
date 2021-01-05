import React from 'react'
import { Link } from 'react-router-dom'
import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from './AlbumsGrid'

const Albums = () => {
	const { albums } = useAlbums()

	return albums && (
		<div className="container">
			<h1 className="title">All Albums</h1>
			<AlbumsGrid albums={albums} />
			<Link className="button is-primary" to="/albums/create">Create album</Link>
		</div>
	)
}

export default Albums
