import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import City from "../../models/City";
import { getCityById } from "../../services/cityService";
import "./CityDetailsPage.css";
import { Button } from "react-bootstrap";
import CityCharacteristics from "./CityCharacteristics";
import CityVisitors from "./CityVisitors";
import { addDislikedCity, removeLikedCity } from "../../services/userService";
import ThumbsContainer from "../common/ThumbsContainer";

const CityDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
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
    if (userProfile) {
      if (userProfile.likesCityIds.some((like) => like === cityId)) {
        setLiked(true);
      } else if (userProfile.hometownId === cityId) {
        setLiked(true);
      }
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
      {city && userProfile && (
        <main className="CityDetailsPage">
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
          <CityVisitors city={city} userProfile={userProfile} />
          <p className="description">{city.cityDescription}</p>
          <CityCharacteristics city={city} userProfile={userProfile} />
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
              onClick={() => unlikeCity(userProfile.uid, city._id!)}
            >
              Remove City
            </Button>
          )}
        </main>
      )}
    </>
  );
};

export default CityDetailsPage;
