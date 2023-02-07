import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Trip from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { getUserByUid } from "../../services/userService";
import InviteFriendsModal from "./InviteFriendsModal";
import ParticipantCard from "./ParticipantCard";
import "./ParticipantsSection.css";

interface Props {
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip | null>>;
  tripCreator: boolean;
}

const ParticipantsSection = ({ trip, setTrip, tripCreator }: Props) => {
  const [participants, setParticipants] = useState<UserProfile[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    Promise.all(trip.participants.map((item) => getUserByUid(item.uid))).then(
      (response) => setParticipants(response)
    );
  }, [trip]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <section className="ParticipantsSection">
      <div className="participants-label-row">
        <h4>Participants</h4>
        {tripCreator && (
          <Button variant="warning" onClick={handleShow}>
            Invite Friends
          </Button>
        )}
      </div>
      <ul className="participants-list">
        {participants.map((participant) => (
          <ParticipantCard
            key={participant.uid}
            participant={participant}
            tripId={trip._id!}
          />
        ))}
      </ul>
      <InviteFriendsModal
        trip={trip}
        show={show}
        setTrip={setTrip}
        handleClose={handleClose}
      />
    </section>
  );
};

export default ParticipantsSection;
