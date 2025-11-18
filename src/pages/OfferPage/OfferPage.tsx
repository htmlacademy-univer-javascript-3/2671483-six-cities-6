import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../widgets/Map/ui';
import { Header } from '../../widgets/Header';
import ReviewList from '../../widgets/ReviewList/ui/ReviewList';
import ReviewForm from '../../features/ReviewForm';
import { OfferGallery } from '../../entities/offer/ui/OfferGallery';

import type { Offer } from '../../shared/types/Offer.type';

import { comments } from '../../mocks/comments';
import { fullOffers } from '../../mocks/fullOffers';
import { Mark, RatingStars } from '../../shared/ui';
import { BookmarkButton } from '../../features/Favorites';
import { OfferListWrapper } from '../../widgets/OfferListWrapper';

function OfferPage() {
  const [selectedPoint, setSelectedPoint] = useState<Offer['id'] | undefined>(
    undefined
  );

  const { offerId } = useParams();

  const offerData = fullOffers.find((offer) => offer.id === offerId);

  let images = offerData?.images;

  if (!images) {
    images = [];
  }

  const handlePointHover = (itemId: string | undefined) => {
    setSelectedPoint(itemId);
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerData?.isPremium && <Mark>Premium</Mark>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <BookmarkButton block="offer" />
              </div>
              <RatingStars rating={offerData?.rating} block="offer" withValue />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
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
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={comments} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map block="offer" selectedPoint={selectedPoint} />
        </section>
        <div className="container">
          <OfferListWrapper block="nearby" onListItemHover={handlePointHover} />
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
