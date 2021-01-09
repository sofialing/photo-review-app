import { useLocation } from 'react-router-dom'
import imageSrc from '../../assets/images/photos-approved.png'

const ReviewCompleted = () => {
	const { state } = useLocation()

	return (
		<section className="section">
			<div className="container">
				<div className="columns is-centered">
					<div className="column is-half">
						<figure className="image is-square">
							<img src={imageSrc} alt="photos approved" />
						</figure>
						<h1 className="has-text-centered">Thank you! {state.photos} photos approved.</h1>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ReviewCompleted
