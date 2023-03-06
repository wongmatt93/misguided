import { useEffect, useState } from "react";
import City from "../models/City";
import { getAllCities } from "../services/cityService";

const useFetchAllCities = (): City[] => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getAllCities().then((response) => setCities(response));
  }, []);

  return cities;
};

export default useFetchAllCities;
