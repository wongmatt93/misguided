import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Trip } from "../../../models/Trip";
import {
  sortTripsAscending,
  sortTripsDescending,
} from "../../../utils/dateFunctions";
import "./TripsMain.css";
import TripsContainer from "./TripsContainer";

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
          <TripsContainer
            refreshProfile={refreshProfile}
            trips={sortTripsAscending(upcomingTrips)}
            pastTrip={false}
          />
        </Tab>
        <Tab eventKey="pastTrips" title="Past Trips">
          <TripsContainer
            refreshProfile={refreshProfile}
            trips={sortTripsDescending(pastTrips)}
            pastTrip={true}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TripsMain;
