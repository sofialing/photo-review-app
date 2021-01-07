const Notification = ({ message, setMessage, type = null }) => {
	return (
		<div className={`notification ${type ? `is-${type} is-light` : ''}`}>
			<button className="delete" onClick={() => setMessage(null)}></button>
			<p>{message}</p>
		</div>
	)
}

export default Notification
