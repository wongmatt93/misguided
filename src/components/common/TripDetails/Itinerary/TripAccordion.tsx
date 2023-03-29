import Accordion from "react-bootstrap/Accordion";
import Trip from "../../../../models/Trip";
import "./TripAccordion.css";
import TripSingleDayDetails from "./TripSingleDayDetails";

interface Props {
  trip: Trip;
  cityName: string;
}

const TripAccordion = ({ trip, cityName }: Props) => {
  return (
    <Accordion className="TripAccordion" alwaysOpen>
      <Accordion.Item eventKey="travel-info">
        <Accordion.Header>Travel Info</Accordion.Header>
        <Accordion.Body>
          <h4 className="city-name">{cityName}</h4>
          <p>
            {new Date(Number(trip.startDate)).toLocaleDateString()}
            {trip.startDate !== trip.endDate &&
              ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
          </p>
          {trip.hotel && (
            <>
              <p>Hotel: {trip.hotel}</p>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
      {trip.schedule.map((day, index) => (
        <TripSingleDayDetails key={index} index={index} day={day} />
      ))}
    </Accordion>
  );
};

export default TripAccordion;
