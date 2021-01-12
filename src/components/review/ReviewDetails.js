const ReviewDetails = ({ onSubmit, approved, rejected }) => {
	return (
		<aside className="level is-mobile">
			<div className="level-left">
				<div className="level-item">
					<button className="button is-primary" onClick={onSubmit}>Submit</button>
				</div>
			</div>
			<div className="level-right">
				<div className="level-item">
					<p className="heading">
						<strong>{approved.length}</strong> approved
     				</p>
				</div>
				<div className="level-item">
					<p className="heading">&#47;</p>
				</div>
				<div className="level-item">
					<p className="heading">
						<strong>{rejected.length}</strong> rejected
     				</p>
				</div>
			</div>
		</aside>
	)
}

export default ReviewDetails;
