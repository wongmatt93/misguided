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
}

const TripsMain = ({ upcomingTrips, pastTrips }: Props) => {
  return (
    <div className="TripsMain">
      <Tabs justify variant="pills">
        <Tab eventKey="upcomingTrips" title="Upcoming Trips">
          <TripsContainer trips={sortTripsAscending(upcomingTrips)} />
        </Tab>
        <Tab eventKey="pastTrips" title="Past Trips">
          <TripsContainer trips={sortTripsDescending(pastTrips)} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TripsMain;
