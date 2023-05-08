import City from "./City";
import { UserProfile } from "./UserProfile";

export interface Comment {
  uid: string;
  comment: string;
  date: string;
}

export interface Message {
  uid: string;
  text: string;
  date: string;
}

export interface Participant {
  uid: string;
  accepted: boolean;
}

export interface SingleDaySchedule {
  breakfast: string;
  breakfastPhoto: string;
  breakfastAddress: string[];
  breakfastPhone: string;
  breakfastUrl: string;
  lunch: string;
  lunchPhoto: string;
  lunchAddress: string[];
  lunchPhone: string;
  lunchURL: string;
  dinner: string;
  dinnerPhoto: string;
  dinnerAddress: string[];
  dinnerPhone: string;
  dinnerUrl: string;
  event1: string;
  event1Photo: string;
  event1Address: string[];
  event1Phone: string;
  event1Url: string;
  event2: string;
  event2Photo: string;
  event2Address: string[];
  event2Phone: string;
  event2Url: string;
}

export interface Trip {
  _id?: string;
  cityId: string;
  creatorUid: string;
  nickname: string;
  startDate: string;
  endDate: string;
  hotel: string | null;
  schedule: SingleDaySchedule[];
  photos: string[];
  participants: Participant[];
  messages: Message[];
  completed: boolean;
  likesUids: string[];
  comments: Comment[];
}

export default interface FullTrip {
  _id?: string;
  city: City;
  creatorUid: string;
  nickname: string;
  startDate: string;
  endDate: string;
  hotel: string | null;
  schedule: SingleDaySchedule[];
  photos: string[];
  participants: Participant[];
  participantProfiles: UserProfile[];
  messages: Message[];
  completed: boolean;
  likesUids: string[];
  comments: Comment[];
}
