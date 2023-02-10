import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import "./TripsPage.css";
import UpcomingTripsContainer from "./UpcomingTripsContainer";
import PastTripsContainer from "./PastTripsContainer";
import TripRequestsContainer from "./TripRequestsContainer";
import { UserTrip } from "../../models/UserProfile";

const TripsPage = () => {
  const { userProfile, userTrips } = useContext(AuthContext);
  const [tripRequests, setTripRequests] = useState<Trip[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (userTrips.length > 0) {
      let today: Date = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = new Date(yyyy + "-" + mm + "-" + dd);

      const newRequests: Trip[] = [];
      const upcoming: Trip[] = [];
      const past: Trip[] = [];

      userTrips.forEach((trip) => {
        let accepted: boolean = true;
        const userTrip: UserTrip | undefined = userProfile!.trips.find(
          (item) => item.tripId === trip._id!
        );

        const endDate = new Date(trip.date2);

        if (userTrip) {
          accepted = userTrip.accepted;
        }

        if (!accepted) {
          newRequests.push(trip);
        } else if (today.getTime() - endDate.getTime() < 0) {
          upcoming.push(trip);
        } else {
          past.push(trip);
        }
      });

      setTripRequests(
        newRequests.sort(function (a, b) {
          return new Date(a.date1).valueOf() - new Date(b.date1).valueOf();
        })
      );
      setUpcomingTrips(
        upcoming.sort(function (a, b) {
          return new Date(a.date1).valueOf() - new Date(b.date1).valueOf();
        })
      );
      setPastTrips(
        past.sort(function (a, b) {
          return new Date(b.date1).valueOf() - new Date(a.date1).valueOf();
        })
      );
    }
  }, [userProfile, userTrips]);

  return (
    <main className="TripsPage">
      <Tabs
        defaultActiveKey="upcoming-trips"
        variant="pills"
        transition={false}
      >
        <Tab eventKey="trip-requests" title="Trip Requests">
          <TripRequestsContainer tripRequests={tripRequests} />
        </Tab>
        <Tab eventKey="upcoming-trips" title="Upcoming Trips">
          <UpcomingTripsContainer upcomingTrips={upcomingTrips} />
        </Tab>
        <Tab eventKey="past-trips" title="Previous Trips">
          <PastTripsContainer pastTrips={pastTrips} />
        </Tab>
      </Tabs>
    </main>
  );
};

export default TripsPage;
