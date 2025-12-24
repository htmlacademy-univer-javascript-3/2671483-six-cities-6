import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RatingInput from './index';

describe('Component: RatingInput', () => {
  const expectedValue = 5;
  const expectedTitle = 'perfect';
  const expectedId = '5-stars';

  it('should render correctly with provided props', () => {
    render(
      <RatingInput
        value={expectedValue}
        title={expectedTitle}
        checked={false}
      />
    );

    const inputElement = screen.getByRole('radio');
    const labelElement = screen.getByTitle(expectedTitle);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', expectedId);
    expect(inputElement).not.toBeChecked();

    expect(labelElement).toHaveAttribute('for', expectedId);
  });

  it('should be checked when "checked" prop is true', () => {
    render(<RatingInput value={expectedValue} checked />);

    const inputElement = screen.getByRole('radio');
    expect(inputElement).toBeChecked();
  });

  it('should call onChange handler when clicked', () => {
    const handleChange = vi.fn();

    render(
      <RatingInput
        value={expectedValue}
        checked={false}
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByRole('radio');
    fireEvent.click(inputElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
