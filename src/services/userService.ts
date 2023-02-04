import axios from "axios";
import UserProfile, { CityVote, Preferences } from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllUsers = async (): Promise<UserProfile[]> =>
  (await axios.get(`${baseURL}/users`)).data;

export const getUserByUid = async (uid: string): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/users/${uid}`)).data;

export const addNewUser = async (user: UserProfile): Promise<UserProfile> =>
  (await axios.post(`${baseURL}/users`, user)).data;

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

export const updateUserPreferences = async (
  uid: string,
  preferences: Preferences
): Promise<Preferences> =>
  (await axios.put(`${baseURL}/users/${uid}/preferences`, preferences)).data;
