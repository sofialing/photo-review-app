import React from 'react'

const ImageCard = ({ image }) => {
	return (
		<div className="card">
			<div className="card-image">
				<figure className="image">
					<img src={image.url} alt={image.name} />
				</figure>
			</div>
			<div className="card-content">
				<p>{image.name}</p>
			</div>
			<footer className="card-footer">
				<div className="card-footer-item">
					<i className="fas fa-thumbs-down"></i>
				</div>
				<div className="card-footer-item">
					<i className="fas fa-thumbs-up"></i>
				</div>
			</footer>
		</div>
	)
}

export default ImageCard
