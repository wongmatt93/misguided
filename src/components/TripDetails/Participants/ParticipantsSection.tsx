import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import FullTrip, { Participant, Trip } from "../../../models/Trip";
import ActiveUserProfile from "../../../models/UserProfile";
import {
  participantAcceptTrip,
  removeParticipantFromTrip,
} from "../../../services/tripServices";
import { addNotification } from "../../../services/userService";
import { today } from "../../../utils/dateFunctions";
import doubleBook from "../../../utils/doubleBook";
import {
  createTripAcceptNotif,
  createTripDeclineNotif,
} from "../../../utils/notificationsFunctions";
import InviteFriendsModal from "./InviteFriendsModal";
import ParticipantCard from "./ParticipantCard";

import "./ParticipantsSection.css";

interface Props {
  trip: FullTrip;
  userProfile: ActiveUserProfile | undefined;
  participants: Participant[];
  refreshTrip: (tripId: string) => Promise<void>;
}

const ParticipantsSection = ({
  trip,
  userProfile,
  participants,
  refreshTrip,
}: Props) => {
  const [invited, setInvited] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [show, setShow] = useState(false);
  const [pastTrip, setPastTrip] = useState(false);

  useEffect(() => {
    if (userProfile) {
      const match: Participant | undefined = trip.participants.find(
        (participant) => participant.uid === userProfile.uid
      );

      if (match) {
        setInvited(true);
        setAccepted(match.accepted);
      }
    }
  }, [userProfile, trip]);

  useEffect(() => {
    const endDate = trip.endDate
      ? new Date(Number(trip.endDate))
      : new Date(Number(trip.startDate));

    if (today.getTime() - endDate.getTime() >= 0) {
      setPastTrip(true);
    }
  }, [trip]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleAcceptTrip = async (): Promise<void> => {
    if (userProfile) {
      const acceptedTrips: Trip[] = userProfile.upcomingTrips.filter((trip) =>
        trip.participants.find(
          (participant) =>
            participant.uid === userProfile.uid && participant.accepted
        )
      );
      const isDoubleBooked: boolean = await doubleBook(
        acceptedTrips,
        trip.startDate,
        trip.endDate
      );

      if (!isDoubleBooked) {
        const newNotification = createTripAcceptNotif(
          userProfile!.uid,
          trip._id!
        );

        await Promise.allSettled([
          participantAcceptTrip(trip._id!, userProfile!.uid),
          addNotification(trip.creatorUid, newNotification),
        ]);
        refreshTrip(trip._id!);
      } else {
        alert("You are double booking a trip!");
      }
    }
  };

  const handleDeleteTrip = async (): Promise<void> => {
    const newNotification = createTripDeclineNotif(userProfile!.uid, trip._id!);

    await Promise.allSettled([
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
        {userProfile && trip.creatorUid === userProfile.uid && !pastTrip && (
          <Button variant="warning" onClick={handleShow}>
            Invite Friends
          </Button>
        )}
        {userProfile &&
          trip.creatorUid !== userProfile.uid &&
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
            trip={trip}
          />
        ))}
      </ul>
      {userProfile && (
        <InviteFriendsModal
          trip={trip}
          userProfile={userProfile}
          show={show}
          refreshTrip={refreshTrip}
          handleClose={handleClose}
        />
      )}
    </section>
  );
};

export default ParticipantsSection;
