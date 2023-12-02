import { CitySummary } from "./City";
import { Trip } from "./Trip";

export interface Notification {
  user: UserSummary;
  type: string;
  date: string;
  read: boolean;
  tripId?: string;
}

export interface Preferences {
  charming: boolean;
  foodie: boolean;
  nightlife: boolean;
  architecture: boolean;
  history: boolean;
  museums: boolean;
  performingArts: boolean;
  music: boolean;
  hipster: boolean;
  hippie: boolean;
  posh: boolean;
  familyFriendly: boolean;
  lGBTScene: boolean;
  diversity: boolean;
  beachTown: boolean;
  collegeTown: boolean;
  skiTown: boolean;
  outdoorsy: boolean;
  wineries: boolean;
  shopping: boolean;
}

export interface UserSummary {
  uid: string;
  username: string;
  displayName: string;
  photoURL: string;
}

export interface UserProfile {
  _id: string;
  uid: string;
  username: string | null;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  hometownId: string | null;
  preferences: Preferences | null;
  followings: UserSummary[];
  followers: UserSummary[];
  upcomingTrips: Trip[];
  pastTrips: Trip[];
  favoriteCityIds: string[];
  hiddenCityIds: string[];
  notifications: Notification[];
  visitedCities: CitySummary[];
}
