import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MultiUseButton from '../src/Components/MultiUseButton';

describe('MultiUseButton component', () => {
  test('renders a single button and triggers its onClick', () => {
    const btnClick = vi.fn(); // individual button handler
    const buttons = [{ label: 'Click Me', onClick: btnClick }];

    render(<MultiUseButton buttons={buttons} />);

    // Check if the button is rendered
    const button = screen.getByText(/Click Me/i);
    expect(button).toBeTruthy();

    // Click the button
    fireEvent.click(button);

    // Ensure the click handler was called
    expect(btnClick).toHaveBeenCalled();
  });
});

