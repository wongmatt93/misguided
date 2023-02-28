import axios from "axios";
import City, { Rating, Visitor } from "../models/City";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllCities = async (): Promise<City[]> =>
  (await axios.get(`${baseURL}/cities`)).data;

export const getCityById = async (id: string): Promise<City> =>
  (await axios.get(`${baseURL}/cities/${id}`)).data;

export const addNewCity = async (city: City): Promise<City> =>
  (await axios.post(`${baseURL}/cities`, city)).data;

export const addRating = async (
  id: string,
  newRating: Rating
): Promise<Rating> =>
  (await axios.put(`${baseURL}/cities/${id}/new-rating`, newRating)).data;

export const updateRating = async (
  id: string,
  uid: string,
  newRating: string
): Promise<string> =>
  (await axios.put(`${baseURL}/cities/${id}/${uid}/${newRating}/update-rating`))
    .data;

export const addVisitor = async (
  id: string,
  newVisitor: Visitor
): Promise<Visitor> =>
  (await axios.put(`${baseURL}/cities/${id}/add-visitor`, newVisitor)).data;
