interface Participant {
  uid: string;
  participantName: string;
  participantPhotoURL: string;
}

export interface SingleDaySchedule {
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

export default interface Trip {
  _id?: string;
  date1: string;
  date2: string;
  cityName: string;
  cityPhoto: string;
  hotel: string | null;
  schedule: SingleDaySchedule[];
  photos: string[];
  participants: Participant[];
}
