import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from '../App';

it('renders home page', async () => {
	const history = createBrowserHistory();
	window.history.pushState({}, '', '/')

	await act(async () => {
		render(
			<BrowserRouter history={history}>
				<App />
			</BrowserRouter>
		)
	})

	expect(screen.getByRole('heading', { name: 'Simple Photo Reviewing' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: 'Get started' })).toBeInTheDocument();
});
