import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../../context/AuthContext";
import FriendsContext from "../../../context/FriendsContext";
import Trip from "../../../models/Trip";
import UserProfile, { UserTrip } from "../../../models/UserProfile";
import {
  addNewParticipantToTrip,
  getTripById,
} from "../../../services/tripServices";
import { addNewUserTrip } from "../../../services/userService";
import InviteFriendCheckbox from "./InviteFriendCheckbox";
import "./InviteFriendsModal.css";

interface Props {
  trip: Trip;
  show: boolean;
  setTrip: React.Dispatch<React.SetStateAction<Trip | null>>;
  handleClose: () => void;
}

const InviteFriendsModal = ({ trip, show, setTrip, handleClose }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const { friends } = useContext(FriendsContext);
  const [filteredFriends, setFilteredFriends] = useState<UserProfile[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

  useEffect(() => {
    setFilteredFriends(
      friends.filter(
        (friend) => !friend.trips.some((item) => item.tripId === trip._id!)
      )
    );
  }, [friends, trip]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const newTrip: UserTrip = {
      tripId: trip._id!,
      accepted: false,
    };

    Promise.all(
      invitedFriends.map((friend) =>
        addNewUserTrip(friend, newTrip).then(() =>
          addNewParticipantToTrip(trip._id!, { uid: friend })
        )
      )
    ).then(() =>
      getTripById(trip._id!).then((response) => {
        setTrip(response);
        refreshProfile(userProfile!.uid);
      })
    );

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
