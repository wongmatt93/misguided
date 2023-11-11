import axios from "axios";
import { SingleDaySchedule } from "../models/Trip";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getYelpItinerary = async (
  location: string,
  duration: number
): Promise<SingleDaySchedule[]> =>
  (await axios.get(`${baseURL}/yelp/schedule/${location}/${duration}`)).data;

export const searchYelpBusiness = async (id: string) =>
  (await axios.get(`${baseURL}/yelp/business/${id}`)).data;
