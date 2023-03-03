import { useContext, useEffect, useState } from "react";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import "./DiscoverPage.css";
import DiscoverContext from "../../context/DiscoverContext";
import DiscoverCard from "./DiscoverCard";
import { CityVote } from "../../models/UserProfile";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RiGlobeFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { removeAllDislikedCities } from "../../services/userService";

const DiscoverPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const { currentCity, likeCity, dislikeCity } = useContext(DiscoverContext);
  const navigate = useNavigate();
  const [cityRating, setCityRating] = useState(0);

  const handleLikeCity = async (uid: string, cityId: string): Promise<void> => {
    const newLike: CityVote = { cityId };

    await likeCity(uid, newLike);
    navigate(`/plan-trip/city-details/${cityId}`);
  };

  const handleDislikeCity = async (
    uid: string,
    cityId: string
  ): Promise<void> => {
    const newDislike: CityVote = { cityId };

    await dislikeCity(uid, newDislike);
  };

  const handleRefreshTrips = async (uid: string): Promise<void> => {
    await removeAllDislikedCities(uid);
    refreshProfile(uid);
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
              <div className="like-buttons-container">
                <RiThumbUpFill
                  className="thumbs"
                  onClick={() =>
                    handleLikeCity(userProfile.uid, currentCity._id!)
                  }
                />
                <RiThumbDownFill
                  className="thumbs"
                  onClick={() =>
                    handleDislikeCity(userProfile.uid, currentCity._id!)
                  }
                />
              </div>
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
