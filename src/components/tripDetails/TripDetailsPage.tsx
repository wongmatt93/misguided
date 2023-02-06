import Accordion from "react-bootstrap/Accordion";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import "./TripDetailsPage.css";
import TripSingleDayDetails from "./TripSingleDayDetails";

const TripDetailsPage = () => {
  const { userProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (tripId) {
      getTripById(tripId).then((response) => {
        setTrip(response);
        setStartDate(new Date(response.date1));
        setEndDate(new Date(response.date2));
      });
    }
  }, [tripId]);

  return (
    <main className="TripDetailsPage">
      {trip && startDate && endDate && (
        <>
          <h2>{trip.cityName}</h2>
          <h3>
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </h3>
          <h4>Participants</h4>
          <ul className="participants-list">
            {trip.participants.map((participant) => (
              <li key={participant.uid} className="participant">
                <img
                  src={participant.participantPhotoURL}
                  alt={participant.participantPhotoURL}
                />
                <p>{participant.participantName}</p>
              </li>
            ))}
          </ul>
          <Accordion alwaysOpen>
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
        </>
      )}
    </main>
  );
};

export default TripDetailsPage;
