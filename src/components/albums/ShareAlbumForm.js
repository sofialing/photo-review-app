import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const ShareAlbumForm = ({ link }) => {
	const navigate = useNavigate();
	const [copySuccess, setCopySuccess] = useState('');

	const onCopyToClipBoard = async () => {
		try {
			await navigator.clipboard.writeText(link);
			setCopySuccess('Copied link to clipboard');
		} catch (e) {
			setCopySuccess('Failed to copy link');
		}
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
			<div className="buttons mt-5">
				<a className="button is-primary" href={`mailto:?body=Album%20review%20link:%0A${link}`}>Email link</a>
				<button className="button is-primary is-light" onClick={() => navigate(-1)}>Cancel</button>
			</div>
		</>
	)
}

export default ShareAlbumForm
