import OfferList from '../../offer-list/ui/offer-list';

import { SortOffers } from '../../../features/sort-offers';

import { DEFAULT_CITY } from '../../../shared/config/const';
import { OffersCount } from '../../../shared/ui/offers-count';

import { viewConfig } from '../config/view-config';

import { memo } from 'react';
import type { Offers } from '../../../shared/types/offer.type';

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
