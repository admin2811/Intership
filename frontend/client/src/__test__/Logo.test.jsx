import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../components/Logo';

describe('Logo Component', () => {
  test('renders the logo image', () => {
    render(<Logo />);
    // Check if the image is rendered with the correct alt text
    const logoImage = screen.getByAltText(/logo/i);
    expect(logoImage).toBeInTheDocument();

    });
}); 