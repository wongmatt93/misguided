import { useEffect, useState } from "react";
import City from "../models/City";
import { getCityById } from "../services/cityService";

const useCityFetcher = (id: string): City | null => {
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    getCityById(id).then((response) => setCity(response));
  }, [id]);

  return city;
};

export default useCityFetcher;
