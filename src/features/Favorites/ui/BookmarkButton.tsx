import cn from 'classnames';
import { viewConfig } from '../config/viewConfig';
import { useFavorites } from '../model/useFavorites';

type BookmarkButtonProps = {
  block?: 'place-card' | 'offer';
};

export function BookmarkButton({ block = 'place-card' }: BookmarkButtonProps) {
  const { isActive, toggleFavorite } = useFavorites();

  const { buttonClass, buttonClassActive, iconClass, width, height } =
    viewConfig[block];

  return (
    <button
      className={cn(buttonClass, isActive && buttonClassActive)}
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
