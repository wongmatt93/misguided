import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import City from "../../models/City";
import { getCityById } from "../../services/cityService";
import "./CityDetailsPage.css";
import { Button } from "react-bootstrap";
import CityDetailsHeader from "./CityDetailsHeader";
import CityCharacteristics from "./CityCharacteristics";
import CityDetailsButtonsContainer from "./CityDetailsButtonsContainer";
import CityVisitors from "./CityVisitors";

const CityDetailsPage = () => {
  const { userProfile } = useContext(AuthContext);
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
      if (userProfile.likes.some((like) => like.cityId === cityId)) {
        setLiked(true);
      } else if (userProfile.hometownId === cityId) {
        setLiked(true);
      }
    }
  }, [userProfile, cityId]);

  const goBack = (): void => navigate(-1);

  const handleItinerary = (): void => navigate(`/plan-trip/${city!._id}`);

  return (
    <>
      {city && userProfile && (
        <>
          <CityDetailsHeader city={city} goBack={goBack} />
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
              <CityDetailsButtonsContainer
                city={city}
                userProfile={userProfile}
                goBack={goBack}
              />
            )}
          </main>
        </>
      )}
    </>
  );
};

export default CityDetailsPage;
