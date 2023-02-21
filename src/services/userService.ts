import axios from "axios";
import UserProfile, {
  CityVote,
  Follow,
  Notification,
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

export const getUserByUsername = async (
  username: string
): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/${username}/username`)).data;

export const addNewUser = async (user: UserProfile): Promise<UserProfile> =>
  (await axios.post(`${baseURL}/users`, user)).data;

export const updateUsername = async (
  uid: string,
  username: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/update-username`, { username }))
    .data;

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

export const addFollowing = async (
  uid: string,
  newFollowing: Follow
): Promise<Follow> =>
  (await axios.put(`${baseURL}/users/${uid}/add-following`, newFollowing)).data;

export const addFollower = async (
  uid: string,
  newFollower: Follow
): Promise<Follow> =>
  (await axios.put(`${baseURL}/users/${uid}/add-follower`, newFollower)).data;

export const removeFollowing = async (
  userUid: string,
  otherUid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/${userUid}/${otherUid}/remove-following`))
    .data;

export const removeFollower = async (
  userUid: string,
  otherUid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/${userUid}/${otherUid}/remove-follower`))
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
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/${tripId}/delete-trip`)).data;

export const addNotification = async (
  uid: string,
  newNotification: Notification
): Promise<Notification> =>
  (await axios.put(`${baseURL}/users/${uid}/add-notification`, newNotification))
    .data;

export const readNotification = async (
  uid: string,
  notifUid: string,
  date: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/users/${uid}/${notifUid}/${date}/read-notification`
    )
  ).data;
