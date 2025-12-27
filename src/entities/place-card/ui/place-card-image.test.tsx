import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PlaceCardImage } from './place-card-image';

describe('Component: PlaceCardImage', () => {
  const mockProps = {
    linkTo: '/offer/1',
    src: 'img/apartment-01.jpg',
    width: 260,
    height: 200,
    alt: 'Beautiful studio',
    className: 'test-class',
  };

  it('should render correctly with provided props', () => {
    const { linkTo, src, width, height, alt } = mockProps;

    render(
      <MemoryRouter>
        <PlaceCardImage {...mockProps} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(alt);
    const link = screen.getByRole('link');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);
    expect(image).toHaveAttribute('width', width.toString());
    expect(image).toHaveAttribute('height', height.toString());

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', linkTo);
  });

  it('should render with default alt text when alt prop is missing', () => {
    const expectedDefaultAlt = 'Place image';

    render(
      <MemoryRouter>
        <PlaceCardImage
          linkTo={mockProps.linkTo}
          src={mockProps.src}
          width={mockProps.width}
          height={mockProps.height}
        />
      </MemoryRouter>
    );

    const imageDefaultAlt = screen.getByAltText(expectedDefaultAlt);

    expect(imageDefaultAlt).toBeInTheDocument();
  });
});
