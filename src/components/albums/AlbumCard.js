import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import imageFolder from '../../assets/images/image-folder.png'
import { deleteAlbum, updateAlbumTitle } from '../../helpers'

const AlbumCard = ({ album }) => {
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [title, setTitle] = useState(album.title)

	useEffect(() => {
		if (!isInputFocused && title !== album.title) {
			updateAlbumTitle(album.id, title)
		}
	}, [album, isInputFocused, title])

	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<Link to={album.id}>
						<img src={imageFolder} alt="" />
					</Link>
				</figure>
			</div>
			<div className="card-content py-3">
				<div className="control">
					<input
						className={`input ${!isInputFocused ? 'is-static' : ''}`}
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onBlur={() => setIsInputFocused(false)}
						onFocus={() => setIsInputFocused(true)}
					/>
				</div>
			</div>
			<footer className="card-footer">
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faShareSquare} title="Share album" />
				</div>
				<div className="card-footer-item">
					<FontAwesomeIcon icon={faTrash} onClick={() => deleteAlbum(album.id)} title="Delete album" />
				</div>
			</footer>
		</div>
	)
}

export default AlbumCard
