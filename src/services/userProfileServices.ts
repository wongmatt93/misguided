import axios from "axios";
import {
  NewNotification,
  NewUserTemplate,
  Preferences,
  UserProfile,
  UserSummary,
} from "../models/UserProfile";

const baseURL: string | undefined = process.env.REACT_APP_API_URL;

export const addNewUser = async (
  user: NewUserTemplate
): Promise<NewUserTemplate> =>
  (await axios.post(`${baseURL}/users`, user)).data;

export const getUserProfileByUid = async (
  uid: string,
  date: string
): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/user-by-uid/${uid}/${date}`)).data;

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

export const addNotification = async (
  uid: string,
  newNotification: NewNotification
): Promise<Notification> =>
  (await axios.put(`${baseURL}/users/add-notification/${uid}`, newNotification))
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

export const removeAllUserNotifications = async (uid: string) =>
  (await axios.put(`${baseURL}/users/remove-all-user-notifications/${uid}`))
    .data;

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

export const removeAllUserFollowings = async (uid: string): Promise<String> =>
  (await axios.put(`${baseURL}/users/remove-all-followings/${uid}`)).data;

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

export const deleteUser = async (uid: string): Promise<void> =>
  (await axios.delete(`${baseURL}/users/${uid}`)).data;
