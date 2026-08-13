import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jeremy Lee portfolio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /jeremy lee/i })).toBeInTheDocument();
  expect(screen.getByText(/i live in san francisco/i)).toBeInTheDocument();
  expect(screen.queryByText(/more info than you need to know/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/online\/offline/i)).not.toBeInTheDocument();
});
