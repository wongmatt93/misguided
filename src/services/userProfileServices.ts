import axios from "axios";
import { CitySummary } from "../models/City";
import { Trip } from "../models/Trip";
import {
  NewUser,
  Preferences,
  UserProfile,
  UserSummary,
} from "../models/UserProfile";

const baseURL: string | undefined = process.env.REACT_APP_API_URL;

export const addNewUser = async (newUser: NewUser): Promise<string> =>
  (await axios.post(`${baseURL}/users/`, { newUser })).data;

export const getUserProfileByUid = async (uid: string): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/user-by-uid/${uid}`)).data;

export const getUserSuggestions = async (
  uid: string,
  followings: UserSummary[]
): Promise<UserSummary[]> => {
  const followingUids: string[] = followings.map((following) => following.uid);
  const excludedUids: string[] = [uid, ...followingUids];

  return (
    await axios.get(`${baseURL}/users/suggestions/${excludedUids.toString()}`)
  ).data;
};

export const getUserBySearch = async (
  username: string,
  search: string
): Promise<UserSummary[]> =>
  (await axios.get(`${baseURL}/users/${username}/${search}/search`)).data;

export const getUserByUsername = async (
  username: string
): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/user-by-username/${username}`)).data;

export const addFollowing = async (
  uid: string,
  otherUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/add-following/${uid}/${otherUid}`)).data;

export const removeFollowing = async (
  uid: string,
  otherUid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/remove-following/${uid}/${otherUid}`))
    .data;

export const readNotification = async (
  uid: string,
  notifUid: string,
  date: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/users/read-notification/${uid}/${notifUid}/${date}`
    )
  ).data;

export const unreadNotification = async (
  uid: string,
  notifUid: string,
  date: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/users/unread-notification/${uid}/${notifUid}/${date}`
    )
  ).data;

export const deleteNotification = async (
  uid: string,
  notifUid: string,
  date: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/users/delete-notification/${uid}/${notifUid}/${date}`
    )
  ).data;

export const updateProfilePhoto = async (
  uid: string,
  photoURL: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/update-photo/${uid}`, { photoURL })).data;

export const updateHometown = async (
  uid: string,
  cityId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/update-hometown/${uid}/${cityId}`)).data;

export const updatePhoneNumber = async (
  uid: string,
  phone: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/update-phone/${uid}/${phone}`)).data;

export const updateUserPreferences = async (
  uid: string,
  preferences: Preferences
): Promise<string> =>
  (
    await axios.put(`${baseURL}/users/update-preferences/${uid}`, {
      preferences,
    })
  ).data;

export const addFavoriteCity = async (
  uid: string,
  cityId: string
): Promise<String> =>
  (await axios.put(`${baseURL}/users/add-favorite-city/${uid}/${cityId}`)).data;

export const removeFavoriteCity = async (
  uid: string,
  cityId: string
): Promise<String> =>
  (await axios.put(`${baseURL}/users/remove-favorite-city/${uid}/${cityId}`))
    .data;

export const deleteUser = async (
  uid: string,
  trips: Trip[],
  visitedCities: CitySummary[]
): Promise<void> =>
  (
    await axios.delete(`${baseURL}/users/${uid}`, {
      data: { trips, visitedCities },
    })
  ).data;
