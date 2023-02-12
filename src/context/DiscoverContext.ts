import { createContext } from "react";
import City from "../models/City";
import { CityVote } from "../models/UserProfile";

export interface DiscoverContextModel {
  cities: City[];
  currentCity: City | null;
  likeCity: (newCity: CityVote) => void;
  dislikeCity: (newCity: CityVote) => void;
}

const defaultValue: DiscoverContextModel = {
  cities: [],
  currentCity: null,
  likeCity: () => {},
  dislikeCity: () => {},
};

const DiscoverContext = createContext(defaultValue);
export default DiscoverContext;
