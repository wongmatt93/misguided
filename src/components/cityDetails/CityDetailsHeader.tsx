import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiStarFill } from "react-icons/ri";
import City from "../../models/City";
import "./CityDetailsHeader.css";

interface Props {
  city: City;
  goBack: () => void;
}

const CityDetailsHeader = ({ city, goBack }: Props) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const numRatings: number = city.ratings.length;

    if (numRatings > 0) {
      const ratingsSum: number = city.ratings.reduce(
        (pv, cv) => pv + cv.rating,
        0
      );
      setRating(ratingsSum / numRatings);
    }
  }, [city]);

  return (
    <header className="CityDetailsHeader">
      <button onClick={goBack} className="back-button">
        <RiArrowLeftLine />
        <p>Back</p>
      </button>
      <h1 className="city-name">{city.cityName}</h1>
      <div className="rating">
        {rating > 0 ? (
          <>
            <p>{rating.toFixed(1)}</p>
            <RiStarFill />
          </>
        ) : (
          <p className="no-ratings">No Ratings Yet</p>
        )}
      </div>
    </header>
  );
};

export default CityDetailsHeader;
