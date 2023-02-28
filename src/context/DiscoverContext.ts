import { createContext } from "react";
import City from "../models/City";
import { CityVote } from "../models/UserProfile";

export interface DiscoverContextModel {
  cities: City[];
  currentCity: City | null;
  likeCity: (uid: string, newCity: CityVote) => Promise<void>;
  dislikeCity: (uid: string, newCity: CityVote) => Promise<void>;
}

const defaultValue: DiscoverContextModel = {
  cities: [],
  currentCity: null,
  likeCity: async () => {},
  dislikeCity: async () => {},
};

const DiscoverContext = createContext(defaultValue);
export default DiscoverContext;
