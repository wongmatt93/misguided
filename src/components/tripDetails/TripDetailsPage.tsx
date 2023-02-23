import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import "./TripDetailsPage.css";
import TripDetailsHeader from "./TripDetailsHeader";
import TripDetailsMain from "./TripDetailsMain";
import AuthContext from "../../context/AuthContext";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);

  const refreshTrip = async (tripId: string): Promise<void> => {
    await Promise.allSettled([
      setTrip(await getTripById(tripId)),
      refreshProfile(userProfile!.uid),
    ]);
  };

  useEffect(() => {
    if (tripId) {
      getTripById(tripId).then((response) => setTrip(response));
    }
  }, [tripId]);

  return (
    <>
      {trip && (
        <>
          <TripDetailsHeader trip={trip} />
          {userProfile && (
            <TripDetailsMain
              trip={trip}
              userProfile={userProfile}
              refreshTrip={refreshTrip}
            />
          )}
        </>
      )}
    </>
  );
};

export default TripDetailsPage;
