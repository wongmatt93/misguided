interface SingleDaySchedule {
  breakfast: string;
  breakfastPhoto: string;
  lunch: string;
  lunchPhoto: string;
  dinner: string;
  dinnerPhoto: string;
  event1: string;
  event1Photo: string;
  event2: string;
  event2Photo: string;
}

interface Trip {
  date1: string;
  date2: string;
  cityName: string;
  cityPhoto: string;
  hotel: string | null;
  schedule: SingleDaySchedule[];
  photos: string[];
}

export interface CityVote {
  cityId: string;
  cityName: string;
  photo: string;
}

interface Friend {
  uid: string;
  displayName: string;
  photoURL: string | null;
  friendRequestStatus: string | null;
}

interface Preferences {
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

export default interface UserProfile {
  _id?: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  preferences: Preferences | null;
  friends: Friend[];
  likes: CityVote[];
  dislikes: CityVote[];
  trips: Trip[];
}
