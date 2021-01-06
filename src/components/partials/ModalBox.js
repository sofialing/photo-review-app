import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { getReviewLink } from '../../helpers'

const ModalBox = ({ albumId, active }) => {
	const [copySuccess, setCopySuccess] = useState('')
	const [link, setLink] = useState('')
	const [isActive, setIsActive] = useState(active)

	useEffect(() => {
		getReviewLink(albumId)
			.then(link => setLink(link))
	}, [albumId])

	const copyToClipBoard = async () => {
		try {
			await navigator.clipboard.writeText(link)
			setCopySuccess('Copied link to clipboard')
		} catch (e) {
			setCopySuccess('Failed to copy link')
		}
	};

	return (
		<div className={`modal ${isActive ? 'is-active' : ''}`}>
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Share Review Link</p>
					<button className="delete" aria-label="close" onClick={() => setIsActive(false)}></button>
				</header>
				<section className="modal-card-body">
					<div className="field">
						<div className="control has-icons-left">
							<input className="input is-static" type="text" onClick={copyToClipBoard} value={link} readOnly />
							<span className="icon is-small is-left">
								<FontAwesomeIcon icon={faCopy} />
							</span>
						</div>
						<p className="help">{copySuccess}</p>
					</div>
				</section>
			</div>
		</div>
	)
}

export default ModalBox
