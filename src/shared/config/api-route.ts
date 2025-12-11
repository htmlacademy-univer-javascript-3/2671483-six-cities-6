export const ApiRoute = {
  Login: '/login',
  Logout: '/logout',
  Offers: '/offers',
  Offer: (id: string) => `offers/${id}`,
  OffersNearby: (id: string) => `/offers/${id}/nearby`,
  Favorite: '/favorite',
  FavoriteStatus: (id: string, status: 1 | 0) => `/favorite/${id}/${status}`,
  Comments: (id: string) => `/comments/${id}`,
} as const;
