import { render, screen } from '@testing-library/react';
import { Mark } from './index';

describe('Mark Component', () => {
  it('should render mark with children', () => {
    const expectedText = 'Test Mark';

    render(<Mark>{expectedText}</Mark>);

    const markText = screen.getByText(expectedText);

    expect(markText).toBeInTheDocument();
  });
});
