import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Trip from "../../../models/Trip";
import UserProfile, { UserTrip } from "../../../models/UserProfile";
import { removeParticipantFromTrip } from "../../../services/tripServices";
import {
  acceptUserTrip,
  addNotification,
  deleteUserTrip,
} from "../../../services/userService";
import { today } from "../../../utils/dateFunctions";
import {
  createTripAcceptNotif,
  createTripDeclineNotif,
} from "../../../utils/notificationsFunctions";
import InviteFriendsModal from "./InviteFriendsModal";
import ParticipantCard from "./ParticipantCard";
import "./ParticipantsSection.css";

interface Props {
  trip: Trip;
  userProfile: UserProfile;
  participants: UserProfile[];
  refreshTrip: (tripId: string) => Promise<void>;
  tripCreator: boolean;
}

const ParticipantsSection = ({
  trip,
  userProfile,
  participants,
  refreshTrip,
  tripCreator,
}: Props) => {
  const [invited, setInvited] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [show, setShow] = useState(false);
  const [pastTrip, setPastTrip] = useState(false);

  useEffect(() => {
    if (userProfile.trips.length > 0) {
      const found: UserTrip | undefined = userProfile.trips.find(
        (item) => item.tripId === trip._id!
      );

      if (found) {
        setInvited(true);
        setAccepted(found.accepted);
      }
    }
  }, [userProfile, trip]);

  useEffect(() => {
    const endDate = new Date(trip.date2);

    if (today.getTime() - endDate.getTime() >= 0) {
      setPastTrip(true);
    }
  }, [trip]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleAcceptTrip = async (): Promise<void> => {
    const newNotification = createTripAcceptNotif(userProfile.uid, trip._id!);

    await Promise.allSettled([
      acceptUserTrip(userProfile.uid, trip._id!),
      addNotification(trip.creatorUid, newNotification),
    ]);
    refreshTrip(trip._id!);
  };

  const handleDeleteTrip = async (): Promise<void> => {
    const newNotification = createTripDeclineNotif(userProfile!.uid, trip._id!);

    await Promise.allSettled([
      deleteUserTrip(userProfile!.uid, trip._id!),
      removeParticipantFromTrip(trip._id!, userProfile!.uid),
      addNotification(trip.creatorUid, newNotification),
    ]);
    await refreshTrip(trip._id!);
    setInvited(false);
  };

  return (
    <section className="ParticipantsSection">
      <div className="participants-label-row">
        <h4>Participants</h4>
        {tripCreator && !pastTrip && (
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
        userProfile={userProfile}
        show={show}
        refreshTrip={refreshTrip}
        handleClose={handleClose}
      />
    </section>
  );
};

export default ParticipantsSection;
