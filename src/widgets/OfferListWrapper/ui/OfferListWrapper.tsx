import OfferList from '../../OfferList/ui/OfferList';

import { SortOffers } from '../../../features/SortOffers';

import { DEFAULT_CITY } from '../../../shared/config/const';
import { OffersCount } from '../../../shared/ui/OffersCount';

import { viewConfig } from '../config/viewConfig';

import { memo } from 'react';
import type { Offers } from '../../../shared/types/Offer.type';

type OfferListWrapperProps = {
  offers: Offers;
  block: 'main' | 'nearby';
  limit?: number;
  selectedCity?: (typeof DEFAULT_CITY)[number];
  onListItemHover?: (listItemId: string | undefined) => void;
};

function OfferListWrapper(props: OfferListWrapperProps): JSX.Element {
  const { offers, block, limit, selectedCity, onListItemHover } = props;

  const isMainBlock = block === 'main';
  const titleContent = isMainBlock
    ? 'Places'
    : 'Other places in the neighbourhood';

  const { sectionClass, titleClass, listClasses } = viewConfig[block];

  return (
    <section className={sectionClass}>
      <h2 className={titleClass}>{titleContent}</h2>
      {isMainBlock && selectedCity && (
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

const MemoizedOfferListWrapper = memo(OfferListWrapper);

export { MemoizedOfferListWrapper as OfferListWrapper };
