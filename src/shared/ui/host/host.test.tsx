import { render, screen } from '@testing-library/react';
import { Host } from './index';

describe('Component: Host', () => {
  const mockOffer = {
    host: {
      avatarUrl: 'avatar.jpg',
      name: 'John Doe',
      isPro: true,
    },
    description: 'A beautiful place to stay.',
  };
  it('should render host details correctly', () => {
    const expectedName = mockOffer.host.name;
    const expectedDescription = mockOffer.description;
    const expectedAvatar = mockOffer.host.avatarUrl;

    render(<Host offer={mockOffer} />);

    const hostAvatar = screen.getByAltText('Host avatar');
    const hostName = screen.getByText(expectedName);
    const proStatus = screen.getByText('Pro');
    const description = screen.getByText(expectedDescription);

    expect(hostAvatar).toBeInTheDocument();
    expect(hostAvatar).toHaveAttribute('src', expectedAvatar);
    expect(hostName).toBeInTheDocument();
    expect(proStatus).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should not render "Pro" status when host is not pro', () => {
    const nonProOffer = {
      ...mockOffer,
      host: { ...mockOffer.host, isPro: false },
    };
    const proStatusText = 'Pro';

    render(<Host offer={nonProOffer} />);

    const proStatus = screen.queryByText(proStatusText);

    expect(proStatus).not.toBeInTheDocument();
  });
});
