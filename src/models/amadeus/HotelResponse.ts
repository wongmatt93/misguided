interface Distance {
  unit: string;
  value: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Hotel {
  name: string;
  rating: number;
  hotelId: string;
  distace: Distance;
  geoCode: Location;
}

export default interface HotelResponse {
  data: Hotel[];
}
