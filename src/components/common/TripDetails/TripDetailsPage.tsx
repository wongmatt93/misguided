import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import FullTrip from "../../../models/Trip";
import { getFullTripById } from "../../../services/tripServices";
import "./TripDetailsPage.css";
import AuthContext from "../../../context/AuthContext";
import useTimer from "../../../hooks/useTimer";
import LoadingTravel from "../LoadingTravel";
import TripDetailsMain from "./TripDetailsMain";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const navigate: NavigateFunction = useNavigate();
  const [trip, setTrip] = useState<FullTrip | null>(null);
  const timesUp = useTimer(2000);

  const refreshTrip = async (tripId: string): Promise<void> => {
    await Promise.allSettled([
      setTrip(await getFullTripById(tripId)),
      refreshProfile(),
    ]);
  };

  useEffect(() => {
    if (tripId) {
      getFullTripById(tripId).then((trip) => {
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
