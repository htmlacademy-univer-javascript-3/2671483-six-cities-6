import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../shared/config/route';

import type { Offer } from '../../shared/types/Offer.type';
import type { Orientation } from '../../shared/types/Orientation.type';

type PlaceCardProps = {
  data: Offer;
  isActive: boolean;
  orientation?: Orientation;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const viewConfig = {
  vertical: {
    cardClass: 'cities__card',
    imageWrapperClass: 'cities__image-wrapper',
    infoClass: '',
    width: '260',
    height: '200',
  },
  horizontal: {
    cardClass: 'favorites__card',
    imageWrapperClass: 'favorites__image-wrapper',
    infoClass: 'favorites__card-info',
    width: '150',
    height: '110',
  },
};

function PlaceCard({
  data,
  isActive,
  orientation = 'vertical',
  onHoverStart,
  onHoverEnd,
}: PlaceCardProps) {
  const currentView = viewConfig[orientation];

  const offerPath = AppRoute.Offer.replace(':offerId', String(data.id));

  return (
    <article
      className={cn(currentView.cardClass, 'place-card')}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={isActive ? { border: 'red solid 1px' } : {}} // Временненные стили
    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div
        className={cn(
          currentView.imageWrapperClass,
          'place-card__image-wrapper'
        )}
      >
        <a href="#">
          <img
            className="place-card__image"
            src="img/apartment-01.jpg"
            width={currentView.width}
            height={currentView.height}
            alt="Place image"
          />
        </a>
      </div>
      <div className={cn(currentView.infoClass, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{data.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerPath}>{data.title}</Link>
        </h2>
        <p className="place-card__type">{data.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
