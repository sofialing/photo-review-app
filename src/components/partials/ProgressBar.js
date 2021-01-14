const ProgressBar = ({ progress }) => {
	return (
		<progress className="progress is-primary my-5" value={progress} max="100"></progress>
	)
}

export default ProgressBar;
