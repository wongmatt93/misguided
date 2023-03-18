import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import City from "../../models/City";
import { getCityById } from "../../services/cityService";
import "./CityDetailsPage.css";
import { Button } from "react-bootstrap";
import { addDislikedCity, removeLikedCity } from "../../services/userService";
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
  const cityId: string | undefined = useParams().cityId;

  useEffect(() => {
    if (cityId) {
      getCityById(cityId).then((response) => setCity(response));
    }
  }, [cityId]);

  useEffect(() => {
    if (userProfile.likesCityIds.some((like) => like === cityId)) {
      setLiked(true);
    } else if (userProfile.hometownId === cityId) {
      setLiked(true);
    }
  }, [userProfile, cityId]);

  const goBack = (): void => navigate(-1);

  const handleItinerary = (): void =>
    navigate(`/plan-trip/get-itinerary/${city!._id}`);

  const unlikeCity = async (uid: string, cityId: string): Promise<void> => {
    await Promise.allSettled([
      removeLikedCity(uid, cityId),
      addDislikedCity(uid, cityId),
    ]);
    refreshProfile();
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
              uid={userProfile.uid}
              refreshProfile={refreshProfile}
              goBack={goBack}
            />
          )}
          {liked && userProfile.hometownId !== city._id! && (
            <Button
              className="remove-button"
              variant="link"
              onClick={() => unlikeCity(userProfile.uid, city._id!)}
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
