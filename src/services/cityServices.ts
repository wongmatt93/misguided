import axios from "axios";
import City, { NewCity, Rating } from "../models/City";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllCities = async (): Promise<City[]> =>
  (await axios.get(`${baseURL}/cities`)).data;

export const addVisitor = async (
  cityId: string,
  newVisitor: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/add-visitor/${cityId}/${newVisitor}`))
    .data;

export const addRating = async (
  cityId: string,
  newRating: Rating
): Promise<Rating> =>
  (await axios.put(`${baseURL}/cities/add-rating/${cityId}`, newRating)).data;

export const updateRating = async (
  cityId: string,
  uid: string,
  newRating: string
): Promise<string> =>
  (
    await axios.put(
      `${baseURL}/cities/update-rating/${cityId}/${uid}/${newRating}`
    )
  ).data;

export const addNewCity = async (city: NewCity): Promise<NewCity> =>
  (await axios.post(`${baseURL}/cities`, city)).data;
