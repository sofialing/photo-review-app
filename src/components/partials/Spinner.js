import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
	return (
		<div className="spinner-container" data-testid="spinner">
			<FontAwesomeIcon icon={faSpinner} size="3x" spin />
		</div>
	)
}

export default Spinner;
