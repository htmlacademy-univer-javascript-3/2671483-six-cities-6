import { Offers } from '../../types/offer.type';

type OffersCountProps = {
  offers: Offers;
  city: string;
};

export function OffersCount({ offers, city }: OffersCountProps): JSX.Element {
  return (
    <b className="places__found">
      {offers.length} places to stay in {city}
    </b>
  );
}
