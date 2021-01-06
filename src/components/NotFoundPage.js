import image from '../assets/images/404.png'

const NotFoundPage = () => {
	return (
		<div className="container has-text-centered">
			<img src={image} alt="page is missing" />
			<h1>Oh no! Page not found.</h1>
		</div>
	)
}

export default NotFoundPage
