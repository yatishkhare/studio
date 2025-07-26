export interface Property {
  id: string;
  name: string;
  price: number;
  rating: number;
  position: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  locationName: string;
  tags: string[];
  nearbyRestaurants: {
    name: string;
    type: string;
    rating: number;
  }[];
  nearbyMetroStations: {
    name: string;
    distance: string;
  }[];
}

export interface Filters {
  budget: number;
  rating: number;
  tags: string[];
}
