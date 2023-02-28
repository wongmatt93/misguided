export interface Visitor {
  uid: string;
}

export interface Rating {
  uid: string;
  rating: number;
}

export default interface City {
  _id?: string;
  cityName: string;
  cityDescription: string;
  cityCode: string;
  latitude: string;
  longitude: string;
  country: string;
  knownFor: string[];
  photoURL: string;
  ratings: Rating[];
  visitors: Visitor[];
}
