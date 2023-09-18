import Accordion from "react-bootstrap/Accordion";
import { SingleDaySchedule } from "../../../../models/Trip";
import "./TripAccordion.css";
import TripSingleDayDetails from "./TripSingleDayDetails";

interface Props {
  cityName: string;
  startDate: string;
  endDate: string;
  hotel: string | null;
  schedule: SingleDaySchedule[];
}

const TripAccordion = ({
  cityName,
  startDate,
  endDate,
  hotel,
  schedule,
}: Props) => {
  return (
    <Accordion className="TripAccordion" alwaysOpen>
      <Accordion.Item eventKey="travel-info">
        <Accordion.Header>Travel Info</Accordion.Header>
        <Accordion.Body>
          <h3 className="city-name">{cityName}</h3>
          <p>
            {new Date(Number(startDate)).toLocaleDateString()}
            {startDate !== endDate &&
              ` - ${new Date(Number(endDate)).toLocaleDateString()}`}
          </p>
          {hotel && (
            <>
              <p>Hotel: {hotel}</p>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
      {schedule.map((day, index) => (
        <TripSingleDayDetails key={index} index={index} day={day} />
      ))}
    </Accordion>
  );
};

export default TripAccordion;
