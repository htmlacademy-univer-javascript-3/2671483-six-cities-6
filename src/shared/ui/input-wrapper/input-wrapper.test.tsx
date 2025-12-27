import { render, screen } from '@testing-library/react';
import { InputWrapper } from './index';

describe('Component: InputWrapper', () => {
  it('should render correctly', () => {
    const expectedLabel = 'E-mail';
    const expectedPlaceholder = 'Enter your email';
    const expectedName = 'email';

    render(
      <InputWrapper
        label={expectedLabel}
        placeholder={expectedPlaceholder}
        name={expectedName}
      />
    );

    const inputLabel = screen.getByText(expectedLabel);
    const inputPlaceholder = screen.getByPlaceholderText(expectedPlaceholder);

    expect(inputLabel).toBeInTheDocument();
    expect(inputPlaceholder).toBeInTheDocument();
    expect(inputPlaceholder).toHaveAttribute('name', expectedName);
  });

  it('should be able to receive and display value', () => {
    const expectedValue = 'test@test.com';

    render(
      <InputWrapper label="Email" value={expectedValue} onChange={() => {}} />
    );

    const inputValue = screen.getByDisplayValue(expectedValue);

    expect(inputValue).toBeInTheDocument();
  });
});
