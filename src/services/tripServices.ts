import axios from "axios";
import FullTrip, { Trip, Comment, Message, Participant } from "../models/Trip";
import UserProfile from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getFullTripById = async (tripId: string): Promise<FullTrip> =>
  (await axios.get(`${baseURL}/trips/${tripId}/full-trip`)).data;

export const addTrip = async (trip: Trip): Promise<Trip> =>
  (await axios.post(`${baseURL}/trips`, trip)).data;

export const deleteTrip = async (tripId: string): Promise<void> =>
  (await axios.delete(`${baseURL}/trips/${tripId}`)).data;

export const getFollowingsTrips = async (
  userProfile: UserProfile
): Promise<Trip[]> => {
  const { uid, followingUserProfiles } = userProfile;
  const followingUids: string[] = followingUserProfiles.map(
    (profile) => profile.uid
  );
  const includedUids: string[] = [uid, ...followingUids];

  return (
    await axios.get(
      `${baseURL}/trips/followings-trips/${includedUids.toString()}`
    )
  ).data;
};

export const updateNickname = async (
  tripId: string,
  nickname: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/update-nickname/${nickname}`))
    .data;

export const updateCreator = async (
  tripId: string,
  newUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/update-creator/${newUid}`)).data;

export const addNewParticipantToTrip = async (
  tripId: string,
  newParticipant: Participant
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/trips/${tripId}/new-participant`,
      newParticipant
    )
  ).data;

export const participantAcceptTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/accept-trip`)).data;

export const removeParticipantFromTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/remove-participant`))
    .data;

export const addMessageToTrip = async (
  tripId: string,
  newMessage: Message
): Promise<Message> =>
  (await axios.put(`${baseURL}/trips/${tripId}/new-message`, newMessage)).data;

export const completeTrip = async (tripId: string): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/complete-trip`)).data;

export const addPhotosToTrip = async (
  tripId: string,
  photo: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/photos`, { photo })).data;

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

export const removeAllUserLikes = async (uid: string): Promise<string> =>
  (await axios.put(`${baseURL}/trips/remove-all-user-likes/${uid}`)).data;

export const addCommentToTrip = async (
  tripId: string,
  comment: Comment
): Promise<Comment> =>
  (await axios.put(`${baseURL}/trips/${tripId}/comment-trip`, comment)).data;

export const removeCommentFromTrip = async (
  tripId: string,
  comment: Comment
): Promise<string> =>
  await axios.put(`${baseURL}/trips/${tripId}/remove-comment-trip`, comment);

export const removeAllUserComments = async (uid: string) =>
  (await axios.put(`${baseURL}/trips/remove-all-user-comments/${uid}`)).data;
