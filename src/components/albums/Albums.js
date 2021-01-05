import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from './AlbumsGrid'

const Albums = () => {
	const { albums } = useAlbums()

	return albums && (
		<div className="container">
			<h1 className="title">All Albums</h1>
			<AlbumsGrid albums={albums} />
			<Link className="button is-primary" to="/albums/create">
				<span className="icon is-small">
					<FontAwesomeIcon icon={faPlusSquare} />
				</span>
				<strong>Create Album</strong>
			</Link>
		</div>
	)
}

export default Albums
