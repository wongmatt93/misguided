import axios from "axios";
import MultipleYelpResponse from "../models/Yelp";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const searchYelpRestaurants = async (
  location: string
): Promise<MultipleYelpResponse> =>
  (await axios.get(`${baseURL}/yelp/restaurants`, { params: { location } }))
    .data;

export const searchYelpArts = async (
  location: string
): Promise<MultipleYelpResponse> =>
  (await axios.get(`${baseURL}/yelp/arts`, { params: { location } })).data;

export const searchYelpBreakfast = async (
  location: string
): Promise<MultipleYelpResponse> =>
  (await axios.get(`${baseURL}/yelp/breakfast`, { params: { location } })).data;

export const searchYelpBusiness = async (id: string) =>
  (await axios.get(`${baseURL}/yelp/business/${id}`)).data;
