import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FollowContext from "../../../context/FollowContext";
import Trip from "../../../models/Trip";
import UserProfile, {
  Notification,
  UserTrip,
} from "../../../models/UserProfile";
import { addNewParticipantToTrip } from "../../../services/tripServices";
import { addNewUserTrip, addNotification } from "../../../services/userService";
import { createTripRequestNotif } from "../../../utils/notificationsFunctions";
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
  const { friends } = useContext(FollowContext);
  const [filteredFriends, setFilteredFriends] = useState<UserProfile[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

  useEffect(() => {
    setFilteredFriends(
      friends.filter(
        (friend) => !friend.trips.some((item) => item.tripId === trip._id!)
      )
    );
  }, [friends, trip]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const newTrip: UserTrip = {
      tripId: trip._id!,
      accepted: false,
    };

    await Promise.all(
      invitedFriends.map((friend) => {
        const newNotification: Notification = createTripRequestNotif(
          userProfile!.uid,
          trip._id!
        );

        return Promise.allSettled([
          addNotification(friend, newNotification),
          addNewUserTrip(friend, newTrip),
          addNewParticipantToTrip(trip._id!, friend),
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
