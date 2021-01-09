import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container is-flex is-justify-content-space-between is-align-items-center">
				<small className="is-spaced">
					Copyright &copy; {new Date().getFullYear()} PhotoReviewer
				</small>
				<a href="https://github.com/sofialing/photo-review-app" target="_blank" rel="noreferrer">
					<FontAwesomeIcon color="white" icon={faGithub} />
				</a>
			</div>
		</footer>
	)
}

export default Footer
