import { useContext, useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./DiscoverPage.css";
import DiscoverContext from "../../context/DiscoverContext";
import DiscoverCard from "./DiscoverCard";
import { CityVote } from "../../models/UserProfile";
import AuthContext from "../../context/AuthContext";

const DiscoverPage = () => {
  const { userProfile } = useContext(AuthContext);
  const { currentCity, likeCity, dislikeCity } = useContext(DiscoverContext);
  const [cityRating, setCityRating] = useState(0);

  const handleLikeCity = async (uid: string, cityId: string): Promise<void> => {
    const newLike: CityVote = { cityId };

    await likeCity(uid, newLike);
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
      }
    }
  }, [currentCity]);

  return (
    <main className="DiscoverPage">
      <h2>Discover</h2>
      {currentCity && userProfile ? (
        <>
          <DiscoverCard currentCity={currentCity} cityRating={cityRating} />
          <div className="like-buttons-container">
            <AiFillLike
              className="thumbs"
              onClick={() => handleLikeCity(userProfile.uid, currentCity._id!)}
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
        <h3>You're out of cities! Stay tuned while we add more cities</h3>
      )}
    </main>
  );
};

export default DiscoverPage;
