import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../../../../context/AuthContext";
import City from "../../../../models/City";
import { UserSummary } from "../../../../models/UserProfile";
import {
  addFavoriteCity,
  removeFavoriteCity,
} from "../../../../services/userProfileServices";
import CityCharacteristics from "./CityCharacteristics";
import "./CityOverview.css";
import CityVisitors from "./CityVisitors";

interface Props {
  city: City;
}

const CityOverview = ({ city }: Props) => {
  // variables
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const { uid, followings, preferences } = userProfile!;
  const [followingsVisitors, setFollowingsVisitors] = useState<UserSummary[]>(
    []
  );
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${city.photoURL}`;

  const { hometownId, favoriteCityIds } = userProfile!;
  const hometownAndFavorites: string[] = [hometownId!, ...favoriteCityIds];
  const liked: boolean = hometownAndFavorites.some(
    (cityId) => cityId === city._id
  );

  // functions
  useEffect(() => {
    setFollowingsVisitors(
      city.visitors.filter((visitor) =>
        followings.some((following) => following.uid === visitor.uid)
      )
    );
  }, [city, followings]);

  const likeCity = async (): Promise<void> => {
    await addFavoriteCity(uid, city._id!);
    await refreshProfile();
  };

  const unlikeCity = async (): Promise<void> => {
    await removeFavoriteCity(uid, city._id!);
    await refreshProfile();
  };

  return (
    <section className="CityOverview">
      <div className="image-container">
        <img src={imagePath} alt={city.cityName} />
        {liked && (
          <Button variant="warning" className="itinerary-button">
            Get Itinerary
          </Button>
        )}
      </div>
      {followingsVisitors.length > 0 && (
        <CityVisitors followingsVisitors={followingsVisitors} />
      )}
      <p className="description">{city.cityDescription}</p>
      <CityCharacteristics
        characteristics={city.knownFor}
        preferences={preferences!}
      />
      {liked && hometownId !== city._id! && (
        <Button className="remove-button" variant="link" onClick={unlikeCity}>
          Remove City
        </Button>
      )}
      {!liked && hometownId !== city._id! && (
        <Button className="add-button" variant="link" onClick={likeCity}>
          Add City
        </Button>
      )}
    </section>
  );
};

export default CityOverview;
