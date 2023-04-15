import axios from "axios";
import Trip, { Comment, Message, Participant } from "../models/Trip";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getTripById = async (tripId: string): Promise<Trip> =>
  (await axios.get(`${baseURL}/trips/${tripId}`)).data;

export const getTripsByTripIdArray = async (
  tripIds: string[]
): Promise<Trip[]> =>
  (await axios.get(`${baseURL}/trips/trips-by-tripIds/${tripIds.toString()}`))
    .data;

export const addTrip = async (trip: Trip): Promise<Trip> =>
  (await axios.post(`${baseURL}/trips`, trip)).data;

export const deleteTrip = async (tripId: string): Promise<void> =>
  (await axios.delete(`${baseURL}/trips/${tripId}`)).data;

export const getLatestTrip = async (uid: string): Promise<Trip[]> =>
  (await axios.get(`${baseURL}/trips/${uid}/latest`)).data;

export const updateNickname = async (
  tripId: string,
  nickname: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/update-nickname`, { nickname }))
    .data;

export const updateCreator = async (
  tripId: string,
  newUid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/update-creator`, { newUid }))
    .data;

export const addNewParticipantToTrip = async (
  tripId: string,
  newParticipant: Participant
): Promise<string> =>
  (
    await axios.put(`${baseURL}/trips/${tripId}/new-participant`, {
      newParticipant,
    })
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
  (await axios.put(`${baseURL}/trips/${tripId}/new-message`, { newMessage }))
    .data;

export const completeTrip = async (tripId: string): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/complete-trip`)).data;

export const addPhotosToTrip = async (
  tripId: string,
  photo: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/photos`, { photo })).data;

export const likeTrip = async (tripId: string, like: string): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/like-trip`, { like })).data;

export const unlikeTrip = async (tripId: string, uid: string): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/unlike-trip`)).data;

export const commentOnTrip = async (
  tripId: string,
  comment: Comment
): Promise<Comment> =>
  (await axios.put(`${baseURL}/trips/${tripId}/comment-trip`, { comment }))
    .data;
