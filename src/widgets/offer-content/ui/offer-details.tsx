import { memo } from 'react';
import ReviewList from '../../review-list/ui/review-list';
import { selectReviewsCount } from '../model/offer-details.selectors';

import { BookmarkButton } from '../../../features/favorites';
import ReviewForm from '../../../features/review-form';

import { selectIsAuthorized } from '../../../entities/user/model/user.selectors';

import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { Mark, Price, RatingStars } from '../../../shared/ui';

import type { FullOffer } from '../../../shared/types/offer.type';
import type { IReview } from '../../../shared/types/review.type';

type OfferDetailsProps = {
  offer: FullOffer;
  reviews: IReview[];
};

function OfferDetails({ offer, reviews }: OfferDetailsProps): JSX.Element {
  const reviewCount = useAppSelector(selectReviewsCount);
  const isAuth = useAppSelector(selectIsAuthorized);

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {offer.isPremium && <Mark className="offer__mark">Premium</Mark>}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">{offer.title}</h1>
          <BookmarkButton
            offerId={offer.id}
            isFavorite={offer.isFavorite}
            block="offer"
          />
        </div>
        <RatingStars rating={offer.rating} block="offer" withValue />
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {offer.type}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {offer.bedrooms} Bedrooms
          </li>
          <li className="offer__feature offer__feature--adults">
            Max {offer.maxAdults} adults
          </li>
        </ul>
        <Price block={'offer'}>{offer.price}</Price>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            <li className="offer__inside-item">Wi-Fi</li>
            <li className="offer__inside-item">Washing machine</li>
            <li className="offer__inside-item">Towels</li>
            <li className="offer__inside-item">Heating</li>
            <li className="offer__inside-item">Coffee machine</li>
            <li className="offer__inside-item">Baby seat</li>
            <li className="offer__inside-item">Kitchen</li>
            <li className="offer__inside-item">Dishwasher</li>
            <li className="offer__inside-item">Cabel TV</li>
            <li className="offer__inside-item">Fridge</li>
          </ul>
        </div>
        {/* === HOST === */}
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
              <img
                className="offer__avatar user__avatar"
                src={offer.host.avatarUrl}
                width="74"
                height="74"
                alt="Host avatar"
              />
            </div>
            <span className="offer__user-name">{offer.host.name}</span>
            {offer.host.isPro && (
              <span className="offer__user-status">Pro</span>
            )}
          </div>
          <div className="offer__description">
            <p className="offer__text">{offer.description}</p>
          </div>
        </div>
        {/* === {} === */}
        <section className="offer__reviews reviews">
          <ReviewList reviews={reviews} reviewCount={reviewCount} />
          {isAuth && <ReviewForm />}
        </section>
      </div>
    </div>
  );
}

const MemoizedOfferDetails = memo(OfferDetails);

export { MemoizedOfferDetails as OfferDetails };
