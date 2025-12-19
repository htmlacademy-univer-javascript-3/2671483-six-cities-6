import cn from 'classnames';
import { Offer } from '../../../shared/types/Offer.type';
import { viewConfig } from '../config/viewConfig';
import { useFavorites } from '../model/useFavorites';

type BookmarkButtonProps = {
  offerId: Offer['id'];
  isFavorite: 0 | 1;
  block?: 'place-card' | 'offer';
};

export function BookmarkButton({
  offerId,
  isFavorite,
  block = 'place-card',
}: BookmarkButtonProps) {
  const { toggleFavorite } = useFavorites(offerId, isFavorite);

  const { buttonClass, buttonClassActive, iconClass, width, height } =
    viewConfig[block];

  return (
    <button
      className={cn(buttonClass, isFavorite && buttonClassActive)}
      type="button"
      onClick={toggleFavorite}
    >
      <svg className={iconClass} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
