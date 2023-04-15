import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import City from "../../models/City";
import { getCityById } from "../../services/cityService";
import "./CityDetailsPage.css";
import { Button } from "react-bootstrap";
import { updateUserProfile } from "../../services/userService";
import ThumbsContainer from "../common/ThumbsContainer";
import CityVisitors from "./CityVisitors";
import CityCharacteristics from "./CityCharacteristics";
import UserProfile from "../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const CityDetailsPage = ({ userProfile, refreshProfile }: Props) => {
  const [city, setCity] = useState<City | null>(null);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { cityId } = useParams();

  const { favoriteCityIds, hiddenCityIds, hometownId } = userProfile;

  useEffect(() => {
    if (cityId) {
      getCityById(cityId).then((response) => setCity(response));

      if (favoriteCityIds.includes(cityId) || hometownId === cityId) {
        setLiked(true);
      }
    }
  }, [cityId, favoriteCityIds, hometownId]);

  const goBack = (): void => navigate(-1);

  const handleItinerary = (): void =>
    navigate(`/plan-trip/get-itinerary/${city!._id}`);

  const unlikeCity = async (cityId: string): Promise<void> => {
    const likesIndex: number = favoriteCityIds.indexOf(cityId);
    favoriteCityIds.splice(likesIndex, 1);
    hiddenCityIds.push(cityId);

    await updateUserProfile(userProfile);
    await refreshProfile();
    navigate("/plan-trip");
  };

  return (
    <>
      {city && (
        <section className="CityDetailsPage">
          <div className="image-container">
            <img src={city.photoURL} alt={city.cityName} />
            {liked && (
              <Button
                variant="warning"
                className="itinerary-button"
                onClick={handleItinerary}
              >
                Get Itinerary
              </Button>
            )}
          </div>
          <CityVisitors city={city} followingUids={userProfile.followingUids} />
          <p className="description">{city.cityDescription}</p>
          <CityCharacteristics
            city={city}
            preferences={userProfile.preferences!}
          />
          {!liked && (
            <ThumbsContainer
              city={city}
              userProfile={userProfile}
              refreshProfile={refreshProfile}
              goBack={goBack}
            />
          )}
          {liked && userProfile.hometownId !== city._id! && (
            <Button
              className="remove-button"
              variant="link"
              onClick={() => unlikeCity(city._id!)}
            >
              Remove City
            </Button>
          )}
        </section>
      )}
    </>
  );
};

export default CityDetailsPage;
