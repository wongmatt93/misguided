import { useContext, useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./DiscoverPage.css";
import DiscoverContext from "../../context/DiscoverContext";
import DiscoverCard from "./DiscoverCard";
import { CityVote } from "../../models/UserProfile";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DiscoverPage = () => {
  const { userProfile } = useContext(AuthContext);
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
      <main className="DiscoverMain">
        {currentCity && userProfile ? (
          <>
            <DiscoverCard currentCity={currentCity} cityRating={cityRating} />
            <div className="like-buttons-container">
              <AiFillLike
                className="thumbs"
                onClick={() =>
                  handleLikeCity(userProfile.uid, currentCity._id!)
                }
              />
              <AiFillDislike
                className="thumbs"
                onClick={() =>
                  handleDislikeCity(userProfile.uid, currentCity._id!)
                }
              />
            </div>
          </>
        ) : (
          <p>You're out of cities! Stay tuned while we add more cities</p>
        )}
      </main>
    </>
  );
};

export default DiscoverPage;
