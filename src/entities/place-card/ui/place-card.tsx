import cn from 'classnames';
import { Link } from 'react-router-dom';
import { getOfferPath } from '../../../shared/lib/utils';
import { Mark, Price, RatingStars } from '../../../shared/ui';
import { PlaceCardImage } from './place-card-image';

import { viewConfig } from '../config/view-config';

import { memo } from 'react';
import type { Offer } from '../../../shared/types/offer.type';
import type { Orientation } from '../../../shared/types/orientation.type';

type PlaceCardProps = {
  offer: Offer;
  renderBookmarkBtn: (offerId: string, isFavorite: 0 | 1) => JSX.Element;
  orientation?: Orientation;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

function PlaceCard({
  offer,
  renderBookmarkBtn,
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
          {renderBookmarkBtn(offer.id, offer.isFavorite)}
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

const MemoizedPlaceCard = memo(PlaceCard);

export { MemoizedPlaceCard as PlaceCard };
