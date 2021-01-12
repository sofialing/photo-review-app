import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

const EditAlbumForm = ({ onSaveAlbum, album }) => {
	const navigate = useNavigate();
	const titleRef = useRef();

	useEffect(() => {
		titleRef.current.focus();
		if (album) {
			titleRef.current.value = album.title;
		}
	}, [album])

	const onSubmit = (e) => {
		e.preventDefault();

		if (titleRef.current.value.length < 3) {
			return;
		}

		// update album title
		onSaveAlbum(titleRef.current.value);
	}

	const onCancel = (e) => {
		e.preventDefault();

		// go back to previous page
		navigate(-1);
	}

	return (
		<form className="mb-5" onSubmit={onSubmit}>
			<div className="field">
				<label className="label" htmlFor="title">Enter a new name for the album</label>
				<div className="control has-icons-left">
					<input className="input" id="title" type="text" ref={titleRef} />
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faImages} />
					</span>
				</div>
			</div>
			<div className="buttons mt-5">
				<button className="button is-primary">Save</button>
				<button className="button button is-primary is-outlined" onClick={onCancel}>Cancel</button>
			</div>
		</form>
	)
}

export default EditAlbumForm
