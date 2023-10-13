import { useContext, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { RiStarFill } from "react-icons/ri";
import AuthContext from "../../../../../context/AuthContext";
import City from "../../../../../models/City";
import { UserSummary } from "../../../../../models/UserProfile";
import {
  addFavoriteCity,
  removeFavoriteCity,
} from "../../../../../services/userProfileServices";
import ItineraryForm from "../Itinerary/ItineraryForm";
import RatingForm from "../Rating/RatingForm";
import CityCharacteristics from "./CityCharacteristics";
import "./CityOverview.css";
import CityVisitors from "./CityVisitors";

interface Props {
  city: City;
}

const CityOverview = ({ city }: Props) => {
  // variables
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const { uid, followings, preferences, upcomingTrips } = userProfile!;
  const {
    _id,
    cityName,
    cityCode,
    cityDescription,
    photoURL,
    knownFor,
    ratings,
    visitors,
  } = city;
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const rating: number =
    ratings.length > 0
      ? ratings.reduce((pv, cv) => cv.rating + pv, 0) / ratings.length
      : 0;
  const followingsVisitors: UserSummary[] = visitors.filter((visitor) =>
    followings.some((following) => following.uid === visitor.uid)
  );
  const visited: boolean = visitors.some((visitor) => visitor.uid === uid);
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${photoURL}`;

  const { hometownId, favoriteCityIds } = userProfile!;
  const hometownAndFavorites: string[] = [hometownId!, ...favoriteCityIds];
  const liked: boolean = hometownAndFavorites.some((cityId) => cityId === _id);

  // functions
  const likeCity = async (): Promise<void> => {
    await addFavoriteCity(uid, _id!);
    await refreshProfile(uid);
  };

  const unlikeCity = async (): Promise<void> => {
    await removeFavoriteCity(uid, _id!);
    await refreshProfile(uid);
  };

  return (
    <section className="CityOverview">
      <div className="image-container">
        <img src={imagePath} alt={cityName} />
        {liked && (
          <Button
            variant="warning"
            className="itinerary-button"
            onClick={() => setShowItineraryModal(!showItineraryModal)}
          >
            Get Itinerary
          </Button>
        )}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {visited ? "Rate this city!" : "Visit this city before rating!"}
            </Tooltip>
          }
        >
          <Button
            className="rating-container"
            variant="warning"
            onClick={() => visited && setShowRatingModal(!showRatingModal)}
          >
            {rating > 0 ? (
              <div className="rating">
                <p>{rating.toFixed(1)}</p>
                <RiStarFill />
              </div>
            ) : (
              <p className="no-ratings">No Ratings Yet</p>
            )}
          </Button>
        </OverlayTrigger>
      </div>
      {followingsVisitors.length > 0 && (
        <CityVisitors followingsVisitors={followingsVisitors} />
      )}
      <p className="description">{cityDescription}</p>
      <CityCharacteristics
        characteristics={knownFor}
        preferences={preferences!}
      />
      {liked && hometownId !== _id! && (
        <Button className="remove-button" variant="link" onClick={unlikeCity}>
          Remove City
        </Button>
      )}
      {!liked && hometownId !== _id! && (
        <Button className="add-button" variant="link" onClick={likeCity}>
          Add City
        </Button>
      )}
      <RatingForm
        uid={uid}
        cityId={_id!}
        ratings={ratings}
        show={showRatingModal}
        closeItineraryModal={() => setShowRatingModal(!showRatingModal)}
      />
      <ItineraryForm
        uid={uid}
        upcomingTrips={upcomingTrips}
        refreshProfile={() => refreshProfile(uid)}
        cityId={_id!}
        cityName={cityName}
        cityCode={cityCode}
        show={showItineraryModal}
        closeItineraryModal={() => setShowItineraryModal(!showItineraryModal)}
      />
    </section>
  );
};

export default CityOverview;
