import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jeremy Lee portfolio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /jeremy lee/i })).toBeInTheDocument();
  expect(screen.getByText(/more info than you need to know/i)).toBeInTheDocument();
});
