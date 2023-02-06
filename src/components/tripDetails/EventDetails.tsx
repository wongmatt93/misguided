import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import "./EventDetails.css";

interface Props {
  eventType: string;
  eventName: string;
  eventImage: string;
  eventAddress: string[];
  eventPhone: string;
  eventUrl: string;
}

const EventDetails = ({
  eventType,
  eventName,
  eventImage,
  eventAddress,
  eventPhone,
  eventUrl,
}: Props) => {
  return (
    <li className="EventDetails">
      <div className="event-details-container">
        <img src={eventImage} alt={eventImage} />
        <div className="name-container">
          <h4>
            {eventType} - {eventName}
          </h4>
        </div>
        <div className="info-container">
          <div className="address">
            <p>{eventAddress[0]}</p>
            <p>{eventAddress[1]}</p>
          </div>
          <div className="phone-url-container">
            <p>{eventPhone}</p>
            <Link to={eventUrl} target="_blank">
              View On Yelp
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventDetails;
