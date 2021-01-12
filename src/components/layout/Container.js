const Container = ({ children }) => {
	return (
		<main>
			<section className="section">
				<div className="container">
					{children}
				</div>
			</section>
		</main>
	)
}

export default Container;
