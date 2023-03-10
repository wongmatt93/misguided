import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import "./TripDetailsPage.css";
import TripDetailsMain from "./TripDetailsMain";
import AuthContext from "../../context/AuthContext";
import { getCityById } from "../../services/cityService";
import useTimer from "../../hooks/useTimer";
import LoadingTravel from "../common/LoadingTravel";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [cityName, setCityName] = useState("");
  const timesUp = useTimer(2000);

  const refreshTrip = async (tripId: string): Promise<void> => {
    await Promise.allSettled([
      setTrip(await getTripById(tripId)),
      refreshProfile(),
    ]);
  };

  useEffect(() => {
    trip &&
      getCityById(trip.cityId).then((response) =>
        setCityName(response.cityName)
      );
  }, [trip]);

  useEffect(() => {
    tripId && getTripById(tripId).then((response) => setTrip(response));
  }, [tripId]);

  return (
    <>
      {!timesUp && <LoadingTravel />}
      {trip && userProfile && (
        <TripDetailsMain
          trip={trip}
          cityName={cityName}
          userProfile={userProfile}
          refreshProfile={refreshProfile}
          refreshTrip={refreshTrip}
          timesUp={timesUp}
        />
      )}
    </>
  );
};

export default TripDetailsPage;
