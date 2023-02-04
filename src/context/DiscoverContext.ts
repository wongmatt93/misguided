import { createContext } from "react";
import City from "../models/City";
import { CityVote } from "../models/UserProfile";

export interface DiscoverContextModel {
  currentCity: City | null;
  likeCity: (newCity: CityVote) => void;
  dislikeCity: (newCity: CityVote) => void;
}

const defaultValue: DiscoverContextModel = {
  currentCity: null,
  likeCity: () => {},
  dislikeCity: () => {},
};

const DiscoverContext = createContext(defaultValue);
export default DiscoverContext;
