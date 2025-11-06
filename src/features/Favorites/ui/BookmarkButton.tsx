import { useFavorites } from '../model/useFavorites';

export function BookmarkButton() {
  const { isActive, toggleFavorite } = useFavorites();
  return (
    <button
      className={`place-card__bookmark-button${
        isActive ? '--active' : ''
      } button`}
      type="button"
      onClick={toggleFavorite}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
