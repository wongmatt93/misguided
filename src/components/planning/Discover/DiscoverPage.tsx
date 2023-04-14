import { useEffect, useState } from "react";
import "./DiscoverPage.css";
import { useNavigate } from "react-router-dom";
import { RiGlobeFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { updateUserProfile } from "../../../services/userService";
import { getAllCities } from "../../../services/cityService";
import City from "../../../models/City";
import ThumbsContainer from "../../common/ThumbsContainer";
import DiscoverCard from "./DiscoverCard";
import UserProfile from "../../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const DiscoverPage = ({ userProfile, refreshProfile }: Props) => {
  const navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [cityRating, setCityRating] = useState(0);

  useEffect(() => {
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

  const handleRefreshTrips = async (): Promise<void> => {
    await updateUserProfile({ ...userProfile, dislikesCityIds: [] });
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
    <section className="DiscoverPage">
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
            onClick={handleRefreshTrips}
          >
            Refresh Cities
          </Button>
        </div>
      )}
    </section>
  );
};

export default DiscoverPage;
