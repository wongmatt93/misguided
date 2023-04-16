import axios from "axios";
import UserProfile, { Notification } from "../models/UserProfile";

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
  (await axios.put(`${baseURL}/users/${userProfile.uid}`, { userProfile }))
    .data;

export const addFollowing = async (
  uid: string,
  otherUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/${otherUid}/add-following`)).data;

export const addFollower = async (
  uid: string,
  otherUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/${otherUid}/add-follower`)).data;

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

export const addNewUserTrip = async (
  uid: string,
  newTripId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/add-trip`, { newTripId })).data;

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

export const addLikedTrip = async (
  uid: string,
  tripId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/like-trip`, { tripId })).data;

export const removeLikedTrip = async (
  uid: string,
  tripId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/unlike-trip`, { tripId })).data;

export const addCommentedTrip = async (
  uid: string,
  tripId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/comment-trip`, { tripId })).data;

export const removeCommentedTrip = async (
  uid: string,
  tripId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/uncomment-trip`, { tripId })).data;

export const addVisitedCity = async (
  uid: string,
  cityId: string
): Promise<string> =>
  (await axios.put(`${baseURL}/users/${uid}/visit-city`, { cityId })).data;
