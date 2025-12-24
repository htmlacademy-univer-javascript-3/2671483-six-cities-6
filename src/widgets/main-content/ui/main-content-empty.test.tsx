import { render, screen } from '@testing-library/react';
import { MainContentEmpty } from './main-content-empty';

describe('Component: MainContentEmpty', () => {
  it('should render correctly with provided city', () => {
    const expectedCity = 'Paris';
    const expectedStatusText = 'No places to stay available';
    const expectedDescriptionText = new RegExp(
      `We could not find any property available at the moment in ${expectedCity}`,
      'i'
    );

    render(<MainContentEmpty city={expectedCity} />);

    const statusElement = screen.getByText(expectedStatusText);
    const descriptionElement = screen.getByText(expectedDescriptionText);

    expect(statusElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
