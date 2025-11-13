import { Link } from 'react-router-dom';
import cn from 'classnames';
import { PlaceCardImage } from './PlaceCardImage';
import { BookmarkButton } from '../../../features/Favorites';
import { Mark, Price, RatingStars } from '../../../shared/ui';
import { getOfferPath } from '../../../shared/lib/getOfferPath';

import { viewConfig } from '../config/viewConfig';

import type { Offer } from '../../../shared/types/Offer.type';
import type { Orientation } from '../../../shared/types/Orientation.type';

type PlaceCardProps = {
  offer: Offer;
  orientation?: Orientation;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export function PlaceCard({
  offer,
  orientation = 'vertical',
  onHoverStart,
  onHoverEnd,
}: PlaceCardProps) {
  const currentView = viewConfig[orientation];

  const offerPath = getOfferPath(offer.id);

  return (
    <article
      className={cn(currentView.cardClass, 'place-card')}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {offer.isPremium && <Mark className="place-card__mark">Premium</Mark>}
      <PlaceCardImage
        className={cn(
          currentView.imageWrapperClass,
          'place-card__image-wrapper'
        )}
        linkTo={offerPath}
        src={offer.previewImage}
        width={currentView.width}
        height={currentView.height}
      />
      <div className={cn(currentView.infoClass, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <Price block="place-card">{offer.price}</Price>
          <BookmarkButton />
        </div>
        <RatingStars rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={offerPath}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
