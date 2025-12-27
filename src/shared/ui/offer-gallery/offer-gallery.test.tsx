import { render, screen } from '@testing-library/react';
import { OfferGallery } from '.';

describe('Component: OfferGallery', () => {
  it('should render correct number of images', () => {
    const mockImages = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];
    const expectedCount = mockImages.length;
    const expectedAltText = 'Photo studio';

    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText(expectedAltText);

    expect(images).toHaveLength(expectedCount);
    expect(images[0]).toHaveAttribute('src', mockImages[0]);
  });

  it('should render not more than 6 images', () => {
    const manyImages = Array(10).fill('img/test.jpg');
    const expectedMaxCount = 6;

    render(<OfferGallery images={manyImages} />);

    const images = screen.getAllByAltText('Photo studio');

    expect(images.length).toBeLessThanOrEqual(expectedMaxCount);
  });
});
