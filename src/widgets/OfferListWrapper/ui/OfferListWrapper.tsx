import { SortOffers } from '../../../features/SortOffers';
import { OffersCount } from '../../../shared/ui/OffersCount';
import { useFilteredOffers } from '../../OfferList/model/useFilteredOffers';
import OfferList from '../../OfferList/ui/OfferList';
import { viewConfig } from '../config/viewConfig';

type OfferListWrapperProps = {
  block: 'main' | 'nearby';
  limit?: number;
  onListItemHover?: (listItemId: string | undefined) => void;
};

export function OfferListWrapper(props: OfferListWrapperProps): JSX.Element {
  const { block, limit, onListItemHover } = props;

  const { offers, selectedCity } = useFilteredOffers();

  const isMainBlock = block === 'main';
  const titleContent = isMainBlock
    ? 'Places'
    : 'Other places in the neighbourhood';

  const { sectionClass, titleClass, listClasses } = viewConfig[block];

  return (
    <section className={sectionClass}>
      <h2 className={titleClass}>{titleContent}</h2>
      {isMainBlock && (
        <>
          <OffersCount offers={offers} city={selectedCity} />
          <SortOffers />
        </>
      )}
      <OfferList
        offers={offers}
        className={listClasses}
        limit={limit}
        onListItemHover={onListItemHover}
      />
    </section>
  );
}
