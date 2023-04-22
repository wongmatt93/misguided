import axios from "axios";
import City, { Rating } from "../models/City";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllCities = async (): Promise<City[]> =>
  (await axios.get(`${baseURL}/cities`)).data;

export const getCityById = async (cityId: string): Promise<City> =>
  (await axios.get(`${baseURL}/cities/${cityId}`)).data;

export const addNewCity = async (city: City): Promise<City> =>
  (await axios.post(`${baseURL}/cities`, city)).data;

export const addRating = async (
  cityId: string,
  newRating: Rating
): Promise<Rating> =>
  (await axios.put(`${baseURL}/cities/${cityId}/new-rating`, newRating)).data;

export const updateRating = async (
  cityId: string,
  uid: string,
  newRating: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/cities/${cityId}/${uid}/${newRating}/update-rating`
    )
  ).data;

export const removeRating = async (
  cityId: string,
  uid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/${cityId}/remove-rating/${uid}`)).data;

export const addVisitor = async (
  cityId: string,
  newVisitor: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/${cityId}/add-visitor/${newVisitor}`))
    .data;

export const removeVisitor = async (
  cityId: string,
  uid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/${cityId}/remove-visitor/${uid}`)).data;
