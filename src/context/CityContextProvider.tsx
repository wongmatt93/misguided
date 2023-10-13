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

  // functions
  const refreshCities = async () => setCities(await getAllCities());

  return (
    <CityContext.Provider value={{ cities, refreshCities }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;
