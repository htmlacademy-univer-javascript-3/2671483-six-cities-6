import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { useReviewForm } from '../model/use-review-form';
import ReviewForm from './review-form';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock('../model/use-review-form');
const mockUseReviewForm = vi.mocked(useReviewForm);

vi.mock('../../../shared/ui/rating-input', () => ({
  RatingInput: ({
    value,
    onChange,
    checked,
  }: {
    value: string;
    onChange: () => void;
    checked: boolean;
  }) => (
    <input
      data-testid="rating-input"
      type="radio"
      value={value}
      onChange={onChange}
      checked={checked}
    />
  ),
}));

describe('Component: ReviewForm', () => {
  const mockOfferId = 'offer-1';

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ offerId: mockOfferId });
  });

  it('should render correctly with initial state', () => {
    mockUseReviewForm.mockReturnValue({
      comment: '',
      rating: 0,
      isValid: false,
      isPending: false,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    expect(textarea).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', () => {
    mockUseReviewForm.mockReturnValue({
      comment: 'This is a long enough comment to be valid for the form',
      rating: 5,
      isValid: true,
      isPending: false,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should disable submit button when isPending is true', () => {
    mockUseReviewForm.mockReturnValue({
      comment: 'Valid comment text',
      rating: 4,
      isValid: true,
      isPending: true,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should call handleChange when user types in textarea', async () => {
    const handleChange = vi.fn();
    mockUseReviewForm.mockReturnValue({
      comment: '',
      rating: 0,
      isValid: false,
      isPending: false,
      handleChange,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    await userEvent.type(textarea, 'Hello');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should call handleSubmit when form is submitted', async () => {
    const handleSubmit = vi.fn();
    mockUseReviewForm.mockReturnValue({
      comment: 'Valid comment',
      rating: 5,
      isValid: true,
      isPending: false,
      handleChange: vi.fn(),
      handleSubmit,
    });

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
