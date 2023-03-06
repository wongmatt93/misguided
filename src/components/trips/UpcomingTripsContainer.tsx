import { RiFlightTakeoffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Trip from "../../models/Trip";
import TripCard from "./TripCard";
import "./UpcomingTripsContainer.css";

interface Props {
  upcomingTrips: Trip[];
}

const UpcomingTripsContainer = ({ upcomingTrips }: Props) => {
  return (
    <section className="UpcomingTripsContainer">
      {upcomingTrips.length > 0 ? (
        <ul>
          {upcomingTrips.map((trip) => (
            <TripCard key={trip._id!} trip={trip} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <RiFlightTakeoffFill />
          <p>You don't have any upcoming trips</p>
          <Link to="/plan-trip">Click here to start planning one!</Link>
        </div>
      )}
    </section>
  );
};

export default UpcomingTripsContainer;
