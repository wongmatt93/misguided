import axios from "axios";

const apiKey: string = process.env.REACT_APP_AIRLABS_API_KEY || "";

export const getCities = async () =>
  (
    await axios.get(
      `https://airlabs.co/api/v9/cities?country_code=US&api_key=${apiKey}`
    )
  ).data;
