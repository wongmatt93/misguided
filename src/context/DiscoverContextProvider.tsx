import { ReactNode, useContext, useEffect, useState } from "react";
import City from "../models/City";
import { CityVote } from "../models/UserProfile";
import { getAllCities } from "../services/cityService";
import { addDislikedCity, addLikedCity } from "../services/userService";
import AuthContext from "./AuthContext";
import DiscoverContext from "./DiscoverContext";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    userProfile &&
      getAllCities().then((response) => {
        const votedCities: CityVote[] = userProfile.likes.concat(
          userProfile.dislikes
        );
        const remainingCities: City[] = response.filter(
          (city) => !votedCities.some((voted) => voted.cityId === city._id)
        );
        setCities(remainingCities);

        if (remainingCities.length > 0) {
          const index: number = Math.floor(
            Math.random() * remainingCities.length
          );
          const city = remainingCities[index];
          setCurrentCity(city);
        }
      });
  }, [userProfile]);

  useEffect(() => {
    if (cities.length > 0) {
      const index: number = Math.floor(Math.random() * cities.length);
      const city = cities[index];
      setCurrentCity(city);
    } else {
      setCurrentCity(null);
    }
  }, [cities]);

  const likeCity = (newCity: CityVote): void => {
    addLikedCity(userProfile!.uid, newCity).then(() => {
      refreshProfile(userProfile!.uid);
    });
  };

  const dislikeCity = (newCity: CityVote): void => {
    addDislikedCity(userProfile!.uid, newCity).then(() => {
      refreshProfile(userProfile!.uid);
    });
  };

  return (
    <DiscoverContext.Provider
      value={{ cities, currentCity, likeCity, dislikeCity }}
    >
      {children}
    </DiscoverContext.Provider>
  );
};
export default AuthContextProvider;
