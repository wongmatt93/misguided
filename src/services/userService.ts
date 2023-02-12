import axios from "axios";
import UserProfile, {
  CityVote,
  Friend,
  Preferences,
  UserTrip,
} from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllUsers = async (): Promise<UserProfile[]> =>
  (await axios.get(`${baseURL}/users`)).data;

export const getAllUsersByUidArray = async (
  uids: string[]
): Promise<UserProfile[]> =>
  (await axios.get(`${baseURL}/users/users-by-uid/${uids.toString()}`)).data;

export const getUserByUid = async (uid: string): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/${uid}/uid`)).data;

export const getUserByEmail = async (email: string): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/${email}/email`)).data;

export const addNewUser = async (user: UserProfile): Promise<UserProfile> =>
  (await axios.post(`${baseURL}/users`, user)).data;

export const updateUserPhoto = async (
  uid: string,
  photoURL: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/update-photo`, { photoURL })).data;

export const updateUserHometown = async (
  uid: string,
  hometownId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/update-hometown`, { hometownId }))
    .data;

export const addLikedCity = async (
  uid: string,
  newCity: CityVote
): Promise<CityVote> =>
  (await axios.put(`${baseURL}/users/${uid}/likes`, newCity)).data;

export const addDislikedCity = async (
  uid: string,
  newCity: CityVote
): Promise<CityVote> =>
  (await axios.put(`${baseURL}/users/${uid}/dislikes`, newCity)).data;

export const addFriend = async (
  uid: string,
  newFriend: Friend
): Promise<Friend> =>
  (await axios.put(`${baseURL}/users/${uid}/add-friend`, newFriend)).data;

export const deleteFriend = async (
  userUid: string,
  otherUid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/${userUid}/${otherUid}/delete-friend`))
    .data;

export const acceptFriend = async (
  userUid: string,
  otherUid: string
): Promise<Friend> =>
  (await axios.put(`${baseURL}/users/${userUid}/${otherUid}/accept-friend`))
    .data;

export const updateUserPreferences = async (
  uid: string,
  preferences: Preferences
): Promise<Preferences> =>
  (await axios.put(`${baseURL}/users/${uid}/preferences`, preferences)).data;

export const addNewUserTrip = async (
  uid: string,
  newTrip: UserTrip
): Promise<CityVote> =>
  (await axios.put(`${baseURL}/users/${uid}/add-trip`, newTrip)).data;

export const acceptUserTrip = async (
  uid: string,
  tripId: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/${uid}/${tripId}/accept-trip`)).data;

export const deleteUserTrip = async (
  uid: string,
  tripId: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/${uid}/${tripId}/delete-trip`)).data;
