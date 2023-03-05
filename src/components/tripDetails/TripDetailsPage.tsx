import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import "./TripDetailsPage.css";
import TripDetailsHeader from "./header/TripDetailsHeader";
import TripDetailsMain from "./TripDetailsMain";
import AuthContext from "../../context/AuthContext";
import { getCityById } from "../../services/cityService";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [cityName, setCityName] = useState("");

  const refreshTrip = async (tripId: string): Promise<void> => {
    await Promise.allSettled([
      setTrip(await getTripById(tripId)),
      refreshProfile(userProfile!.uid),
    ]);
  };

  useEffect(() => {
    trip &&
      getCityById(trip.cityId).then((response) =>
        setCityName(response.cityName)
      );
  }, [trip]);

  useEffect(() => {
    if (tripId) {
      const interval = setInterval(() => {
        getTripById(tripId).then((response) => setTrip(response));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [tripId]);

  return (
    <>
      {trip && (
        <>
          <TripDetailsHeader
            trip={trip}
            cityName={cityName}
            refreshTrip={refreshTrip}
            userProfile={userProfile}
          />
          <TripDetailsMain
            trip={trip}
            cityName={cityName}
            userProfile={userProfile}
            refreshTrip={refreshTrip}
          />
        </>
      )}
    </>
  );
};

export default TripDetailsPage;
