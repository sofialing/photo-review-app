import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { createBrowserHistory } from 'history'
import App from '../App';
import Albums from './Albums';

it('redirects a non logged in user to login page', async () => {
	const history = createBrowserHistory();
	window.history.pushState({}, '', '/albums');

	await act(async () => {
		render(
			<AuthContext.Provider value={{ user: null }}>
				<BrowserRouter history={history}>
					<App />
				</BrowserRouter>
			</AuthContext.Provider>
		)
	})

	expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();
	expect(screen.queryByRole('heading', { name: 'Albums' })).not.toBeInTheDocument();
})

it('renders albums component correctly for a user with no albums', async () => {
	render(
		<AuthContext.Provider value={{ user: { uid: 'abcef123456789' } }}>
			<BrowserRouter>
				<Albums />
			</BrowserRouter>
		</AuthContext.Provider>
	);

	expect(screen.getByText(/albums/i)).toBeInTheDocument();
	expect(screen.getByTestId('spinner')).toBeInTheDocument();
	expect(await screen.findByText(/you haven't created any albums yet/i)).toBeInTheDocument();
});

it('renders albums component correctly for a user with albums', async () => {
	render(
		<AuthContext.Provider value={{ user: { uid: 'FcHmf33rYfgW8qAXskY17grwmLj2' } }}>
			<BrowserRouter>
				<Albums />
			</BrowserRouter>
		</AuthContext.Provider>
	);

	expect(screen.getByText(/albums/i)).toBeInTheDocument();
	expect(screen.getByTestId('spinner')).toBeInTheDocument();
	expect(await screen.findByTestId('albums-grid')).toBeInTheDocument();
});
