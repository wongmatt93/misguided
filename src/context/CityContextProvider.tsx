import { ReactNode, useEffect, useState } from "react";
import CityContext from "./CityContext";
import City from "../models/City";
import { getAllCities } from "../services/cityServices";

interface Props {
  children: ReactNode;
}

const CityContextProvider = ({ children }: Props) => {
  // hooks
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getAllCities().then((response) => setCities(response));
  }, []);

  return (
    <CityContext.Provider value={{ cities }}>{children}</CityContext.Provider>
  );
};

export default CityContextProvider;
