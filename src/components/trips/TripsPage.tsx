import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { UserTrip } from "../../models/UserProfile";
import "./TripsPage.css";

const TripsPage = () => {
  const { userProfile } = useContext(AuthContext);
  const [trips, setTrips] = useState<UserTrip[]>([]);

  useEffect(() => {
    userProfile && console.log(userProfile.trips);
  }, [userProfile]);

  return <main className="TripsPage">TripsPage works</main>;
};

export default TripsPage;
