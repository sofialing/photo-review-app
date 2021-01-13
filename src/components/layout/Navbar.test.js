import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from './Navbar';

const renderNavbar = (user) => {
	return render(
		<AuthContext.Provider value={{ user }}>
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		</AuthContext.Provider>
	)
}

it('displays navbar for a non logged in user', async () => {
	renderNavbar(false);

	expect(screen.getByText(/log in/i)).toBeInTheDocument();
	expect(screen.queryByText(/log out/i)).not.toBeInTheDocument();
})

it('displays navbar for a logged in user', async () => {
	renderNavbar(true);

	expect(screen.getByText(/create album/i)).toBeInTheDocument();
	expect(screen.getByText(/log out/i)).toBeInTheDocument();
	expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
})
