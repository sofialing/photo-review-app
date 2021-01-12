import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

const CreateAlbumForm = ({ onCreateAlbum, loading }) => {
	const navigate = useNavigate();
	const titleRef = useRef();

	useEffect(() => {
		titleRef.current.focus();
	}, [])

	const onSubmit = (e) => {
		e.preventDefault();

		if (titleRef.current.value.length < 3) {
			return;
		}
		// create new album
		onCreateAlbum(titleRef.current.value);
	}

	const onCancel = (e) => {
		e.preventDefault();

		// go back to previous page
		navigate(-1);
	}

	return (
		<form className="create-album mb-5" onSubmit={onSubmit}>
			<div className="field">
				<label className="label" htmlFor="title">Enter a name for the album</label>
				<div className="control has-icons-left">
					<input className="input" id="title" type="text" ref={titleRef} />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faImages} />
					</span>
				</div>
			</div>
			<div className="buttons mt-5">
				<button className="button is-primary" disabled={loading}>Save</button>
				<button className="button is-primary is-light" disabled={loading} onClick={onCancel}>Cancel</button>
			</div>
		</form>
	)
}

export default CreateAlbumForm;
