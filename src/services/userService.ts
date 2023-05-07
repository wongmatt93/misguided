import axios from "axios";
import ActiveUserProfile, {
  UserProfile,
  Notification,
} from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllUsersByUidArray = async (
  uids: string[]
): Promise<UserProfile[]> =>
  (await axios.get(`${baseURL}/users/users-by-uid/${uids.toString()}`)).data;

export const getUserByUid = async (uid: string) =>
  (await axios.get(`${baseURL}/users/${uid}/uid`)).data;

export const getFullUserProfile = async (
  uid: string,
  date: string
): Promise<ActiveUserProfile> =>
  (await axios.get(`${baseURL}/users/${uid}/${date}/full-profile`)).data;

export const getUserSuggestions = async (
  userProfile: ActiveUserProfile
): Promise<UserProfile[]> => {
  const { uid, followingUserProfiles } = userProfile;
  const followingUids: string[] = followingUserProfiles.map(
    (profile) => profile.uid
  );
  const excludedUids: string[] = [uid, ...followingUids];

  return (
    await axios.get(`${baseURL}/users/suggestions/${excludedUids.toString()}`)
  ).data;
};

export const getUserByUsername = async (
  username: string
): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/${username}/username`)).data;

export const getUserBySearch = async (
  username: string,
  search: string
): Promise<UserProfile[]> =>
  (await axios.get(`${baseURL}/users/${username}/${search}/search`)).data;

export const addNewUser = async (user: UserProfile): Promise<UserProfile> =>
  (await axios.post(`${baseURL}/users`, user)).data;

export const deleteUser = async (uid: string): Promise<void> =>
  (await axios.delete(`${baseURL}/users/${uid}`)).data;

export const updateUserProfile = async (
  userProfile: UserProfile
): Promise<UserProfile> =>
  (await axios.put(`${baseURL}/users/${userProfile.uid}`, userProfile)).data;

export const addFollowing = async (
  uid: string,
  otherUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/${otherUid}/add-following`)).data;

export const removeFollowing = async (
  uid: string,
  otherUid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/users/${uid}/${otherUid}/remove-following`))
    .data;

export const removeAllUserFollowings = async (uid: string): Promise<String> =>
  (await axios.put(`${baseURL}/users/${uid}/remove-all-user-followings`)).data;

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

export const unreadNotification = async (
  uid: string,
  notifUid: string,
  date: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/users/${uid}/${notifUid}/${date}/unread-notification`
    )
  ).data;

export const deleteNotification = async (
  uid: string,
  notifUid: string,
  date: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/users/${uid}/${notifUid}/${date}/delete-notification`
    )
  ).data;

export const addVisitedCity = async (
  uid: string,
  cityId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/visit-city/${cityId}`)).data;
