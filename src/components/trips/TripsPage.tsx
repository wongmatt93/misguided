import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { UserTrip } from "../../models/UserProfile";
import "./TripsPage.css";
import UpcomingTripsContainer from "./UpcomingTripsContainer";
import PastTripsContainer from "./PastTripsContainer";

const TripsPage = () => {
  const { userProfile } = useContext(AuthContext);
  const [upcomingTrips, setUpcomingTrips] = useState<UserTrip[]>([]);
  const [pastTrips, setPastTrips] = useState<UserTrip[]>([]);

  useEffect(() => {
    if (userProfile) {
      let today: Date = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = new Date(yyyy + "-" + mm + "-" + dd);

      setUpcomingTrips(
        userProfile.trips
          .filter((trip) => {
            const endDate = new Date(trip.date2);
            return today.getTime() - endDate.getTime() < 0;
          })
          .sort(function (a, b) {
            return new Date(a.date1).valueOf() - new Date(b.date1).valueOf();
          })
      );

      setPastTrips(
        userProfile.trips
          .filter((trip) => {
            const endDate = new Date(trip.date2);
            return today.getTime() - endDate.getTime() >= 0;
          })
          .sort(function (a, b) {
            return new Date(a.date1).valueOf() - new Date(b.date1).valueOf();
          })
      );
    }
  }, [userProfile]);

  return (
    <main className="TripsPage">
      <Tabs
        defaultActiveKey="upcoming-trips"
        variant="pills"
        transition={false}
      >
        <Tab eventKey="upcoming-trips" title="Upcoming Trips">
          <UpcomingTripsContainer upcomingTrips={upcomingTrips} />
        </Tab>
        <Tab eventKey="past-trips" title="Past Trips">
          <PastTripsContainer pastTrips={pastTrips} />
        </Tab>
      </Tabs>
    </main>
  );
};

export default TripsPage;
