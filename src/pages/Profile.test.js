import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Profile from './Profile';

it('renders profile component with user details', async () => {
	const user = {
		uid: 'abcef123456789',
		displayName: 'Test name',
		email: 'hello@testing.com'

	}

	render(
		<AuthContext.Provider value={{ user }}>
			<BrowserRouter>
				<Profile />
			</BrowserRouter>
		</AuthContext.Provider>
	);

	expect(screen.getByRole('heading', { name: 'User Profile' })).toBeInTheDocument();
	expect(screen.getByDisplayValue('Test name')).toBeInTheDocument();
	expect(screen.getByDisplayValue('hello@testing.com')).toBeInTheDocument();
});
