import axios from "axios";
import Trip from "../models/Trip";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const addTrip = async (trip: Trip): Promise<Trip> =>
  (await axios.post(`${baseURL}/trips`, trip)).data;

export const deleteTrip = async (tripId: string): Promise<void> =>
  (await axios.delete(`${baseURL}/trips/${tripId}`)).data;

export const addPhotosToTrip = async (
  tripId: string,
  photo: string
): Promise<string> =>
  (await axios.put(`${baseURL}/trips/${tripId}/photos`, { photo })).data;
