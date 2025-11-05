export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
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
