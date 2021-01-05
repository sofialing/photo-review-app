import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const CreateAlbum = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const titleRef = useRef()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const onSubmit = async e => {
		e.preventDefault()

		if (titleRef.current.value.length < 3) return

		setError(false)
		setLoading(true)

		try {
			const albumRef = await db.collection('albums').add({
				title: titleRef.current.value,
				owner_id: user.uid
			})
			navigate(`/albums/${albumRef.id}`)
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-content">
					<h1 className="title">Create Album</h1>
					<form className="content" onSubmit={onSubmit}>
						<div className="field">
							<label className="label" htmlFor="title">Album Title</label>
							<div className="control has-icons-left has-icons-right">
								<input className="input" id="title" type="text" placeholder="Album title" ref={titleRef} />
								<span className="icon is-small is-left">
									<FontAwesomeIcon icon={faImages} />
								</span>
							</div>
						</div>
						<div className="field mt-4">
							<div className="control">
								<button className="button is-primary" disabled={loading} type="submit">
									<span className="icon is-small">
										<FontAwesomeIcon icon={faPlusSquare} />
									</span>
									<strong>Create Album</strong>
								</button>
							</div>
						</div>
					</form>
					{error && (
						<div className="notification">
							<button className="delete"></button>
							{error}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CreateAlbum
