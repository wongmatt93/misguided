import { IoArrowBack } from "react-icons/io5";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import City from "../../models/City";
import { getCityById } from "../../services/cityService";
import "./CityDetailsPage.css";
import DiscoverContext from "../../context/DiscoverContext";

const CityDetailsPage = () => {
  const { userProfile } = useContext(AuthContext);
  const { likeCity, dislikeCity } = useContext(DiscoverContext);
  const [city, setCity] = useState<City | null>(null);
  const [cityRating, setCityRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id) {
      getCityById(id).then((response) => {
        setCity(response);
        const numberOfRatings: number = response.ratings.length;
        if (numberOfRatings > 0) {
          const ratingsSum: number = response.ratings.reduce(
            (pv, cv) => pv + cv.rating,
            0
          );
          setCityRating(ratingsSum / numberOfRatings);
        }
      });
    }

    if (userProfile) {
      if (userProfile.likes.some((like) => like.cityId === id)) {
        setLiked(true);
      }
    }
  }, [userProfile, id]);

  const goBack = (): void => navigate(-1);

  const handleLikedCity = (): void => {
    city &&
      likeCity({
        cityId: city._id!,
        cityName: city.cityName,
        photo: city.photoURL,
      });
  };

  const handleDislikedCity = (): void => {
    city &&
      dislikeCity({
        cityId: city._id!,
        cityName: city.cityName,
        photo: city.photoURL,
      });
    goBack();
  };

  return (
    <main className="CityDetailsPage">
      {city && (
        <>
          <button onClick={goBack} className="back-button">
            <IoArrowBack />
            <p>Back</p>
          </button>
          <div className="image-container">
            <img src={city.photoURL} alt={city.cityName} />
            {liked && (
              <button className="itinerary-button">Get Itinerary</button>
            )}
          </div>
          <div className="info-container">
            <div className="name-rating-container">
              <h3>{city.cityName}</h3>
              <p className="rating">
                {cityRating ? cityRating : "No Ratings Yet"}
              </p>
            </div>
            <p className="description">{city.cityDescription}</p>
            <ul style={{ paddingBottom: liked ? "0" : "3em" }}>
              {city.knownFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {!liked && (
            <div className="like-buttons-container">
              <AiFillLike className="thumbs" onClick={handleLikedCity} />
              <AiFillDislike className="thumbs" onClick={handleDislikedCity} />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default CityDetailsPage;
