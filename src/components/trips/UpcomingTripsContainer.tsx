import Trip from "../../models/Trip";
import TripCard from "./TripCard";
import "./UpcomingTripsContainer.css";

interface Props {
  upcomingTrips: Trip[];
}

const UpcomingTripsContainer = ({ upcomingTrips }: Props) => {
  return (
    <main className="UpcomingTripsContainer">
      <ul>
        {upcomingTrips.map((trip) => (
          <TripCard key={trip._id!} trip={trip} />
        ))}
      </ul>
    </main>
  );
};

export default UpcomingTripsContainer;
