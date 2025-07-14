import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from '../Header';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('renders the application title', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('MERN Tasks')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    renderWithRouter(<Header />);
    const taskLink = screen.getByRole('link', { name: /tasks/i });
    const healthLink = screen.getByRole('link', { name: /health/i });
    
    expect(taskLink).toHaveAttribute('href', '/');
    expect(healthLink).toHaveAttribute('href', '/health');
  });
});