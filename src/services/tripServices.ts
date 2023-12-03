import axios from "axios";
import { Message, Trip } from "../models/Trip";
import { UserSummary } from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const addTrip = async (
  uid: string,
  cityId: string,
  cityName: string,
  cityCode: string,
  startDate: string,
  endDate: string
): Promise<string> =>
  (
    await axios.post(
      `${baseURL}/trips/${uid}/${cityId}/${cityName}/${cityCode}/${startDate}/${endDate}`
    )
  ).data;

export const getFullTripById = async (tripId: string): Promise<Trip> =>
  (await axios.get(`${baseURL}/trips/full-trip/${tripId}`)).data;

export const getFollowingsTrips = async (
  uid: string,
  followings: UserSummary[]
): Promise<Trip[]> => {
  const followingUids: string[] = followings.map((profile) => profile.uid);
  const includedUids: string[] = [uid, ...followingUids];

  return (
    await axios.get(
      `${baseURL}/trips/followings-trips/${includedUids.toString()}`
    )
  ).data;
};

export const addLikesUid = async (
  tripId: string,
  uid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/like-trip/${tripId}/${uid}`)).data;

export const removeLikesUid = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/unlike-trip/${tripId}/${uid}`)).data;

export const addCommentToTrip = async (
  tripId: string,
  uid: string,
  date: string,
  comment: string
): Promise<string> =>
  (
    await axios.put(`${baseURL}/trips/comment-trip/${tripId}/${uid}/${date}`, {
      comment,
    })
  ).data;

export const removeCommentFromTrip = async (
  tripId: string,
  uid: string,
  date: string,
  comment: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/trips/remove-comment-trip/${tripId}/${uid}/${date}`,
      { comment }
    )
  ).data;

export const addNewParticipantToTrip = async (
  tripId: string,
  uid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/new-participant/${tripId}/${uid}`)).data;

export const removeParticipantFromTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/remove-participant/${tripId}/${uid}`))
    .data;

export const participantAcceptTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/accept-trip/${tripId}/${uid}`)).data;

export const addMessageToTrip = async (
  tripId: string,
  newMessage: Message
): Promise<Message> =>
  (await axios.put(`${baseURL}/trips/new-message/${tripId}`, newMessage)).data;

export const deleteTrip = async (tripId: string): Promise<void> =>
  (await axios.delete(`${baseURL}/trips/${tripId}`)).data;

export const addPhotosToTrip = async (
  tripId: string,
  photo: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/photos/${tripId}`, { photo })).data;

export const updateNickname = async (
  tripId: string,
  nickname: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/update-nickname/${tripId}/${nickname}`))
    .data;

export const completeTrip = async (tripId: string): Promise<void> =>
  (await axios.put(`${baseURL}/trips/complete-trip/${tripId}`)).data;
