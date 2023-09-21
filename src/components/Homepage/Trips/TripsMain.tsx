import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Trip } from "../../../models/Trip";
import {
  sortTripsAscending,
  sortTripsDescending,
} from "../../../utils/dateFunctions";
import "./TripsMain.css";
import TripsContainer from "./TripsContainer";
import { RiFlightLandFill, RiFlightTakeoffFill } from "react-icons/ri";
import { Link } from "react-router-dom";

interface Props {
  upcomingTrips: Trip[];
  pastTrips: Trip[];
  refreshProfile: () => Promise<void>;
}

const TripsMain = ({ upcomingTrips, pastTrips, refreshProfile }: Props) => {
  return (
    <div className="TripsMain">
      <Tabs justify variant="pills">
        <Tab eventKey="upcomingTrips" title="Upcoming Trips">
          {upcomingTrips.length > 0 ? (
            <TripsContainer
              refreshProfile={refreshProfile}
              trips={sortTripsAscending(upcomingTrips)}
              pastTrip={false}
            />
          ) : (
            <div className="empty">
              <RiFlightTakeoffFill />
              <p>You don't have any upcoming trips</p>
              <Link to="/planning">Click here to start planning one!</Link>
            </div>
          )}
        </Tab>
        <Tab eventKey="pastTrips" title="Past Trips">
          {pastTrips.length > 0 ? (
            <TripsContainer
              refreshProfile={refreshProfile}
              trips={sortTripsDescending(pastTrips)}
              pastTrip={true}
            />
          ) : (
            <div className="empty">
              <RiFlightLandFill />
              <p>Your completed trips will to populate here</p>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default TripsMain;
