import axios from "axios";
import City from "../models/City";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllCities = async (): Promise<City[]> =>
  (await axios.get(`${baseURL}/cities`)).data;

export const getCityById = async (id: string): Promise<City> =>
  (await axios.get(`${baseURL}/cities/${id}`)).data;

export const addNewCity = async (city: City): Promise<City> =>
  (await axios.post(`${baseURL}/cities`, city)).data;
