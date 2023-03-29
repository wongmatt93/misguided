import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Trip from "../../../models/Trip";
import { getTripById } from "../../../services/tripServices";
import "./TripDetailsPage.css";
import AuthContext from "../../../context/AuthContext";
import { getCityById } from "../../../services/cityService";
import useTimer from "../../../hooks/useTimer";
import LoadingTravel from "../LoadingTravel";
import TripDetailsMain from "./TripDetailsMain";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const navigate: NavigateFunction = useNavigate();
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
    if (tripId) {
      getTripById(tripId).then((trip) => {
        getCityById(trip.cityId).then((city) => setCityName(city.cityName));
        setTrip(trip);
      });

      !userProfile && navigate(`/trip-details/${tripId}`);
    }
  }, [tripId, userProfile, navigate]);

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
