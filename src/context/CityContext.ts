import { createContext } from "react";
import City from "../models/City";

interface CityContextModel {
  cities: City[];
  refreshCities: () => Promise<void>;
}

const defaultValues: CityContextModel = {
  cities: [],
  refreshCities: async () => {},
};

const CityContext = createContext(defaultValues);

export default CityContext;
