import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../../../context/AuthContext";
import useFriendsFetcher from "../../../../hooks/useFriendsFetcher";
import Trip from "../../../../models/Trip";
import UserProfile, { Notification } from "../../../../models/UserProfile";
import { addNewParticipantToTrip } from "../../../../services/tripServices";
import { addNotification } from "../../../../services/userService";
import { createTripRequestNotif } from "../../../../utils/notificationsFunctions";
import InviteFriendCheckbox from "./InviteFriendCheckbox";
import "./InviteFriendsModal.css";

interface Props {
  trip: Trip;
  userProfile: UserProfile;
  show: boolean;
  refreshTrip: (tripId: string) => Promise<void>;
  handleClose: () => void;
}

const InviteFriendsModal = ({
  trip,
  userProfile,
  show,
  refreshTrip,
  handleClose,
}: Props) => {
  const { followers } = useContext(AuthContext);
  const friends: UserProfile[] = useFriendsFetcher(userProfile, followers);
  const [filteredFriends, setFilteredFriends] = useState<UserProfile[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

  useEffect(() => {
    setFilteredFriends(
      friends.filter(
        (friend) =>
          !trip.participants.some(
            (participant) => participant.uid === friend.uid
          )
      )
    );
  }, [friends, trip]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await Promise.all(
      invitedFriends.map((friend) => {
        const newNotification: Notification = createTripRequestNotif(
          userProfile!.uid,
          trip._id!
        );

        return Promise.allSettled([
          addNotification(friend, newNotification),
          addNewParticipantToTrip(trip._id!, { uid: friend, accepted: false }),
          setInvitedFriends([]),
        ]);
      })
    );

    await refreshTrip(trip._id!);

    handleClose();
  };

  return (
    <Modal className="InviteFriendsModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Friends to Invite</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="friends-list">
            {filteredFriends.map((friend) => (
              <InviteFriendCheckbox
                key={friend.uid}
                friend={friend}
                invitedFriends={invitedFriends}
                setInvitedFriends={setInvitedFriends}
              />
            ))}
          </div>
          <Button
            variant="warning"
            type="submit"
            className="invite-friends-button"
          >
            Invite
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InviteFriendsModal;
