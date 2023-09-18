import { createContext } from "react";
import City from "../models/City";

interface CityContextModel {
  cities: City[];
}

const defaultValues: CityContextModel = {
  cities: [],
};

const CityContext = createContext(defaultValues);

export default CityContext;
