import { UserSummary } from "./UserProfile";

export interface Rating {
  uid: string;
  rating: number;
}

export interface CitySummary {
  _id: string;
  cityName: string;
  photoURL: string;
  visitors: UserSummary[];
}

export interface NewCity {
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
  visitorsUids: string[];
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
  visitors: UserSummary[];
}
