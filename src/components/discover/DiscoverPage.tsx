import { useContext, useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./DiscoverPage.css";
import DiscoverContext from "../../context/DiscoverContext";
import DiscoverCard from "./DiscoverCard";

const DiscoverPage = () => {
  const { currentCity, likeCity, dislikeCity } = useContext(DiscoverContext);
  const [cityRating, setCityRating] = useState(0);

  const handleLikedCity = (): void => {
    currentCity &&
      likeCity({
        cityId: currentCity._id!,
        cityName: currentCity.cityName,
        photo: currentCity.photoURL,
      });
  };

  const handleDislikedCity = (): void => {
    currentCity &&
      dislikeCity({
        cityId: currentCity._id!,
        cityName: currentCity.cityName,
        photo: currentCity.photoURL,
      });
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
      {currentCity ? (
        <>
          <DiscoverCard currentCity={currentCity} cityRating={cityRating} />
          <div className="like-buttons-container">
            <AiFillLike className="thumbs" onClick={handleLikedCity} />
            <AiFillDislike className="thumbs" onClick={handleDislikedCity} />
          </div>
        </>
      ) : (
        <h3>You're out of cities! Stay tuned while we add more cities</h3>
      )}
    </main>
  );
};

export default DiscoverPage;
