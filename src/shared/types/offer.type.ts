export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: 0 | 1;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export interface FullOffer extends Omit<Offer, 'previewImage'> {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
}

export interface City {
  name: string;
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offers = Offer[];
