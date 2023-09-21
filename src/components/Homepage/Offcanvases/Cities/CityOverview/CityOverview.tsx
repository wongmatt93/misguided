import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../../../../../context/AuthContext";
import City from "../../../../../models/City";
import { UserSummary } from "../../../../../models/UserProfile";
import {
  addFavoriteCity,
  removeFavoriteCity,
} from "../../../../../services/userProfileServices";
import ItineraryForm from "../Itinerary/ItineraryForm";
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
  const { _id, cityName, cityCode, cityDescription, photoURL, knownFor } = city;
  const [show, setShow] = useState(false);
  const [followingsVisitors, setFollowingsVisitors] = useState<UserSummary[]>(
    []
  );
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${photoURL}`;

  const { hometownId, favoriteCityIds } = userProfile!;
  const hometownAndFavorites: string[] = [hometownId!, ...favoriteCityIds];
  const liked: boolean = hometownAndFavorites.some((cityId) => cityId === _id);

  // functions
  useEffect(() => {
    setFollowingsVisitors(
      city.visitors.filter((visitor) =>
        followings.some((following) => following.uid === visitor.uid)
      )
    );
  }, [city, followings]);

  const likeCity = async (): Promise<void> => {
    await addFavoriteCity(uid, _id!);
    await refreshProfile(uid);
  };

  const unlikeCity = async (): Promise<void> => {
    await removeFavoriteCity(uid, _id!);
    await refreshProfile(uid);
  };

  const showItineraryModal = (): void => setShow(true);
  const closeItineraryModal = (): void => setShow(false);

  return (
    <section className="CityOverview">
      <div className="image-container">
        <img src={imagePath} alt={cityName} />
        {liked && (
          <Button
            variant="warning"
            className="itinerary-button"
            onClick={showItineraryModal}
          >
            Get Itinerary
          </Button>
        )}
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
      <ItineraryForm
        uid={uid}
        upcomingTrips={upcomingTrips}
        refreshProfile={() => refreshProfile(uid)}
        cityId={_id!}
        cityName={cityName}
        cityCode={cityCode}
        show={show}
        closeItineraryModal={closeItineraryModal}
      />
    </section>
  );
};

export default CityOverview;
