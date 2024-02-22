import { render, screen } from '@testing-library/react';
import ProjectBoard from '../ProjectBoard';

test('renders learn react link', () => {
  render(<ProjectBoard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
