import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const ShareAlbumForm = ({ link }) => {
	const navigate = useNavigate()
	const [copySuccess, setCopySuccess] = useState('')

	const onCopyToClipBoard = async () => {
		try {
			await navigator.clipboard.writeText(link)
			setCopySuccess('Copied link to clipboard')
		} catch (e) {
			setCopySuccess('Failed to copy link')
		}
	}

	const onCancel = () => {
		// go back to previous page
		navigate(-1)
	}

	return (
		<>
			<div className="field mt-5">
				<div className="control has-icons-right">
					<input className="input" type="text" onClick={onCopyToClipBoard} value={link} readOnly />
					<span className="icon is-small is-right">
						<FontAwesomeIcon icon={faCopy} />
					</span>
				</div>
				<p className="help mt-2">{copySuccess}</p>
			</div>
			<div className="field is-grouped mt-5">
				<div className="control">
					<a href={`mailto:?subject=Album%20Review%20Available&body=Album%20review%20link:%0A${link}`} className="button is-primary">Email link</a>
				</div>
				<div className="control">
					<button className="button is-primary is-light" onClick={onCancel}>Cancel</button>
				</div>
			</div>
		</>
	)
}

export default ShareAlbumForm
