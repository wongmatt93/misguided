import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import AuthContext from "../../../../context/AuthContext";
import Trip, { Participant } from "../../../../models/Trip";
import UserProfile from "../../../../models/UserProfile";
import {
  participantAcceptTrip,
  removeParticipantFromTrip,
} from "../../../../services/tripServices";
import { addNotification } from "../../../../services/userService";
import { today } from "../../../../utils/dateFunctions";
import doubleBook from "../../../../utils/doubleBook";
import {
  createTripAcceptNotif,
  createTripDeclineNotif,
} from "../../../../utils/notificationsFunctions";
import InviteFriendsModal from "./InviteFriendsModal";
import ParticipantCard from "./ParticipantCard";

import "./ParticipantsSection.css";

interface Props {
  trip: Trip;
  userProfile: UserProfile | undefined;
  participants: UserProfile[];
  refreshTrip: (tripId: string) => Promise<void>;
}

const ParticipantsSection = ({
  trip,
  userProfile,
  participants,
  refreshTrip,
}: Props) => {
  const { upcomingTrips } = useContext(AuthContext);
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
      const isDoubleBooked: boolean = await doubleBook(
        upcomingTrips,
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
