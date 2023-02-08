import Accordion from "react-bootstrap/Accordion";
import Trip from "../../../models/Trip";
import "./TripAccordion.css";
import TripSingleDayDetails from "./TripSingleDayDetails";

interface Props {
  trip: Trip;
}

const TripAccordion = ({ trip }: Props) => {
  return (
    <Accordion className="TripAccordion" alwaysOpen>
      <Accordion.Item eventKey="travel-info">
        <Accordion.Header>Travel Info</Accordion.Header>
        <Accordion.Body>
          <h4>{trip.hotel}</h4>
        </Accordion.Body>
      </Accordion.Item>
      {trip.schedule.map((day, index) => (
        <TripSingleDayDetails key={index} index={index} day={day} />
      ))}
    </Accordion>
  );
};

export default TripAccordion;
