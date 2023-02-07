import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import UserProfile, { UserTrip } from "../../models/UserProfile";
import { removeParticipantFromTrip } from "../../services/tripServices";
import {
  acceptUserTrip,
  deleteUserTrip,
  getUserByUid,
} from "../../services/userService";
import InviteFriendsModal from "./InviteFriendsModal";
import ParticipantCard from "./ParticipantCard";
import "./ParticipantsSection.css";

interface Props {
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip | null>>;
  tripCreator: boolean;
}

const ParticipantsSection = ({ trip, setTrip, tripCreator }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [invited, setInvited] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [participants, setParticipants] = useState<UserProfile[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.trips.length > 0) {
        const found: UserTrip | undefined = userProfile.trips.find(
          (item) => item.tripId === trip._id!
        );

        if (found) {
          setInvited(true);
          setAccepted(found.accepted);
        }
      }
    }
  }, [userProfile, trip]);

  useEffect(() => {
    Promise.all(trip.participants.map((item) => getUserByUid(item.uid))).then(
      (response) => setParticipants(response)
    );
  }, [trip]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleAcceptTrip = (): Promise<void> =>
    acceptUserTrip(userProfile!.uid, trip._id!).then(() =>
      refreshProfile(userProfile!.uid)
    );

  const handleDeleteTrip = (): Promise<void> =>
    deleteUserTrip(userProfile!.uid, trip._id!).then(() =>
      removeParticipantFromTrip(trip._id!, userProfile!.uid).then(() =>
        refreshProfile(userProfile!.uid).then(() => setInvited(false))
      )
    );

  return (
    <section className="ParticipantsSection">
      <div className="participants-label-row">
        <h4>Participants</h4>
        {tripCreator && (
          <Button variant="warning" onClick={handleShow}>
            Invite Friends
          </Button>
        )}
        {!tripCreator &&
          invited &&
          (accepted ? (
            <Button variant="warning" onClick={handleDeleteTrip}>
              Leave Trip
            </Button>
          ) : (
            <DropdownButton
              id="dropdown-basic-button"
              title="Respond to Invite"
              variant="warning"
            >
              <Dropdown.Item onClick={handleAcceptTrip}>
                Accept Trip
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteTrip}>
                Decline Trip
              </Dropdown.Item>
            </DropdownButton>
          ))}
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