import { useContext, useEffect, useState } from "react";
import "./DiscoverPage.css";
import DiscoverCard from "./DiscoverCard";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RiGlobeFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { removeAllDislikedCities } from "../../services/userService";
import { getAllCities } from "../../services/cityService";
import City from "../../models/City";
import ThumbsContainer from "../common/ThumbsContainer";

const DiscoverPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [cityRating, setCityRating] = useState(0);

  useEffect(() => {
    userProfile &&
      getAllCities().then((response) => {
        const votedCities: string[] = userProfile.likesCityIds.concat(
          userProfile.dislikesCityIds
        );
        const remainingCities: City[] = response
          .filter((city) => !votedCities.some((cityId) => cityId === city._id))
          .filter((city) => city._id !== userProfile.hometownId);

        if (remainingCities.length > 0) {
          const index: number = Math.floor(
            Math.random() * remainingCities.length
          );
          const city = remainingCities[index];
          setCurrentCity(city);
        } else {
          setCurrentCity(null);
        }
      });
  }, [userProfile]);

  const navigateDetails = (cityId: string) =>
    navigate(`/plan-trip/city-details/${cityId}`);

  const handleRefreshTrips = async (uid: string): Promise<void> => {
    await removeAllDislikedCities(uid);
    refreshProfile();
  };

  useEffect(() => {
    if (currentCity) {
      const numberOfRatings: number = currentCity.ratings.length;
      if (numberOfRatings > 0) {
        const ratingsSum: number = currentCity.ratings.reduce(
          (pv, cv) => pv + cv.rating,
          0
        );
        setCityRating(ratingsSum / numberOfRatings);
      } else {
        setCityRating(0);
      }
    }
  }, [currentCity]);

  return (
    <>
      <header className="DiscoverHeader">
        <h1>discover</h1>
      </header>
      {userProfile && (
        <main className="DiscoverMain">
          {currentCity ? (
            <>
              <DiscoverCard currentCity={currentCity} cityRating={cityRating} />
              <ThumbsContainer
                city={currentCity}
                userProfile={userProfile}
                refreshProfile={refreshProfile}
                navigateDetails={navigateDetails}
              />
            </>
          ) : (
            <div className="empty">
              <RiGlobeFill />
              <p>You're out of cities!</p>
              <Button
                className="refresh-button"
                variant="warning"
                type="button"
                onClick={() => handleRefreshTrips(userProfile.uid)}
              >
                Refresh Cities
              </Button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default DiscoverPage;
