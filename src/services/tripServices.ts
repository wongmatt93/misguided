import axios from "axios";
import { Message, newComment, NewParticipant, Trip } from "../models/Trip";
import { UserSummary } from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getFullTripById = async (tripId: string): Promise<Trip> =>
  (await axios.get(`${baseURL}/trips/${tripId}/full-trip`)).data;

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
  (await axios.put(`${baseURL}/trips/${tripId}/like-trip/${uid}`)).data;

export const removeLikesUid = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/unlike-trip/${uid}`)).data;

export const addCommentToTrip = async (
  tripId: string,
  comment: newComment
): Promise<newComment> =>
  (await axios.put(`${baseURL}/trips/${tripId}/comment-trip`, comment)).data;

export const removeCommentFromTrip = async (
  tripId: string,
  comment: newComment
): Promise<string> =>
  await axios.put(`${baseURL}/trips/${tripId}/remove-comment-trip`, comment);

export const addNewParticipantToTrip = async (
  tripId: string,
  newParticipant: NewParticipant
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/trips/${tripId}/new-participant`,
      newParticipant
    )
  ).data;

export const removeParticipantFromTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/remove-participant`))
    .data;

export const participantAcceptTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/accept-trip`)).data;

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
  (await axios.put(`${baseURL}/trips/${tripId}/photos`, { photo })).data;

export const updateCreator = async (
  tripId: string,
  newUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/update-creator/${newUid}`)).data;

export const removeAllUserLikes = async (uid: string): Promise<string> =>
  (await axios.put(`${baseURL}/trips/remove-all-user-likes/${uid}`)).data;

export const removeAllUserComments = async (uid: string) =>
  (await axios.put(`${baseURL}/trips/remove-all-user-comments/${uid}`)).data;
