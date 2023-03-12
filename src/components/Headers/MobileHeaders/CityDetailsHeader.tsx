import { useEffect, useState } from "react";
import { RiStarFill } from "react-icons/ri";
import City from "../../../models/City";
import { getCityById } from "../../../services/cityService";
import "./CityDetailsHeader.css";

interface Props {
  path: string;
}

const CityDetailsHeader = ({ path }: Props) => {
  const [city, setCity] = useState<City | null>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (path.includes("city-details")) {
      let cityId: string;

      if (path.includes("plan-trip")) {
        cityId = path.slice(24);
      } else {
        cityId = path.slice(14);
      }

      getCityById(cityId).then((response) => {
        setCity(response);

        if (response) {
          const numRatings: number = response.ratings.length;

          if (numRatings > 0) {
            const ratingsSum: number = response.ratings.reduce(
              (pv, cv) => pv + cv.rating,
              0
            );
            setRating(ratingsSum / numRatings);
          }
        }
      });
    }
  }, [path]);

  return (
    <header className="CityDetailsHeader">
      {city && (
        <>
          <h1 className="city-name">{city.cityName.toLowerCase()}</h1>
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
        </>
      )}
    </header>
  );
};

export default CityDetailsHeader;
