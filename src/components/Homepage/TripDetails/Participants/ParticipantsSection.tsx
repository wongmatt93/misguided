import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Participant, Trip } from "../../../../models/Trip";
import { UserSummary } from "../../../../models/UserProfile";
import {
  participantAcceptTrip,
  removeParticipantFromTrip,
} from "../../../../services/tripServices";
import { addNotification } from "../../../../services/userProfileServices";
import { getCurrentDateString } from "../../../../utils/dateFunctions";
import {
  createTripAcceptNotif,
  createTripDeclineNotif,
} from "../../../../utils/notificationsFunctions";
import { doubleBook } from "../../../../utils/tripFunctions";
import InviteFriendsModal from "./InviteFriendsModal";
import ParticipantCard from "./ParticipantCard";
import "./ParticipantsSection.css";

interface Props {
  uid: string;
  upcomingTrips: Trip[];
  followers: UserSummary[];
  followings: UserSummary[];
  tripId: string;
  creator: UserSummary;
  participants: Participant[];
  startDate: string;
  endDate: string;
  refreshTrip: () => Promise<void>;
}

const ParticipantsSection = ({
  uid,
  upcomingTrips,
  followers,
  followings,
  tripId,
  creator,
  participants,
  startDate,
  endDate,
  refreshTrip,
}: Props) => {
  // variables
  const [invited, setInvited] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [show, setShow] = useState(false);
  const [pastTrip, setPastTrip] = useState(false);

  // functions
  useEffect(() => {
    const match: Participant | undefined = participants.find(
      (participant) => participant.user.uid === uid
    );

    if (match) {
      setInvited(true);
      setAccepted(match.accepted);
    }
  }, [uid, participants]);

  useEffect(() => {
    const end: Date = endDate
      ? new Date(Number(endDate))
      : new Date(Number(startDate));

    if (new Date(getCurrentDateString).getTime() - end.getTime() >= 0) {
      setPastTrip(true);
    }
  }, [endDate, startDate]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleAcceptTrip = async (): Promise<void> => {
    const acceptedTrips: Trip[] = upcomingTrips.filter((trip) =>
      trip.participants.find(
        (participant) => participant.user.uid === uid && participant.accepted
      )
    );
    const isDoubleBooked: boolean = await doubleBook(
      acceptedTrips,
      startDate,
      endDate
    );

    if (!isDoubleBooked) {
      const newNotification = createTripAcceptNotif(uid, tripId);

      await Promise.allSettled([
        participantAcceptTrip(tripId, uid),
        addNotification(creator.uid, newNotification),
      ]);
      await refreshTrip();
    } else {
      alert("You are double booking a trip!");
    }
  };

  const handleDeleteTrip = async (): Promise<void> => {
    const newNotification = createTripDeclineNotif(uid, tripId);

    await Promise.allSettled([
      removeParticipantFromTrip(tripId, uid),
      addNotification(creator.uid, newNotification),
    ]);
    await refreshTrip();
    setInvited(false);
  };

  return (
    <section className="ParticipantsSection">
      <div className="participants-label-row">
        <h2>Participants</h2>
        {creator.uid === uid && !pastTrip && (
          <Button variant="warning" onClick={handleShow}>
            Invite Friends
          </Button>
        )}
        {creator.uid !== uid &&
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
            key={participant.user.uid}
            participant={participant}
          />
        ))}
      </ul>
      <InviteFriendsModal
        uid={uid}
        followers={followers}
        followings={followings}
        tripId={tripId}
        participants={participants}
        refreshTrip={refreshTrip}
        show={show}
        handleClose={handleClose}
      />
    </section>
  );
};

export default ParticipantsSection;
