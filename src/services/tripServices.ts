import axios from "axios";
import Trip, { Comment, Like, Participant } from "../models/Trip";

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

export const addNewParticipantToTrip = async (
  tripId: string,
  newParticipant: Participant
): Promise<Participant> =>
  (
    await axios.put(`${baseURL}/trips/${tripId}/new-participant`, {
      newParticipant,
    })
  ).data;

export const removeParticipantFromTrip = async (
  tripId: string,
  uid: string
): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/remove-participant`))
    .data;

export const completeTrip = async (tripId: string): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/complete-trip`)).data;

export const addPhotosToTrip = async (
  tripId: string,
  photo: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/photos`, { photo })).data;

export const likeTrip = async (tripId: string, like: Like): Promise<Like> =>
  (await axios.put(`${baseURL}/trips/${tripId}/like-trip`, { like })).data;

export const unlikeTrip = async (tripId: string, uid: string): Promise<void> =>
  (await axios.put(`${baseURL}/trips/${tripId}/${uid}/unlike-trip`)).data;

export const commentOnTrip = async (
  tripId: string,
  comment: Comment
): Promise<Comment> =>
  (await axios.put(`${baseURL}/trips/${tripId}/comment-trip`, { comment }))
    .data;
