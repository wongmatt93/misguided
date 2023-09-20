import axios from "axios";
import City, { NewCity } from "../models/City";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllCities = async (): Promise<City[]> =>
  (await axios.get(`${baseURL}/cities`)).data;

export const addVisitor = async (
  cityId: string,
  newVisitor: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/add-visitor/${cityId}/${newVisitor}`))
    .data;

export const removeVisitor = async (
  cityId: string,
  uid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/remove-visitor/${cityId}/${uid}`)).data;

export const removeRating = async (
  cityId: string,
  uid: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/remove-rating/${cityId}/${uid}`)).data;

export const addNewCity = async (city: NewCity): Promise<NewCity> =>
  (await axios.post(`${baseURL}/cities`, city)).data;
