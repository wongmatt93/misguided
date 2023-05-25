import Accordion from "react-bootstrap/Accordion";
import { SingleDaySchedule } from "../../../models/Trip";
import EventDetails from "./EventDetails";
import "./TripSingleDayDetails.css";

interface Props {
  index: number;
  day: SingleDaySchedule;
}

const TripSingleDayDetails = ({ index, day }: Props) => {
  return (
    <Accordion.Item
      className="TripSingleDayDetails"
      eventKey={index.toString()}
    >
      <Accordion.Header>Day {index + 1}</Accordion.Header>
      <Accordion.Body>
        <ul>
          <EventDetails
            eventType={"Breakfast"}
            eventName={day.breakfast}
            eventImage={day.breakfastPhoto}
            eventAddress={day.breakfastAddress}
            eventPhone={day.breakfastPhone}
            eventUrl={day.breakfastUrl}
          />
          <EventDetails
            eventType={"Morning Event"}
            eventName={day.event1}
            eventImage={day.event1Photo}
            eventAddress={day.event1Address}
            eventPhone={day.event1Phone}
            eventUrl={day.event1Url}
          />
          <EventDetails
            eventType={"Lunch"}
            eventName={day.lunch}
            eventImage={day.lunchPhoto}
            eventAddress={day.lunchAddress}
            eventPhone={day.lunchPhone}
            eventUrl={day.lunchURL}
          />
          <EventDetails
            eventType={"Afternoon Event"}
            eventName={day.event2}
            eventImage={day.event2Photo}
            eventAddress={day.event2Address}
            eventPhone={day.event2Phone}
            eventUrl={day.event2Url}
          />
          <EventDetails
            eventType={"Dinner"}
            eventName={day.dinner}
            eventImage={day.dinnerPhoto}
            eventAddress={day.dinnerAddress}
            eventPhone={day.dinnerPhone}
            eventUrl={day.dinnerUrl}
          />
        </ul>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TripSingleDayDetails;
