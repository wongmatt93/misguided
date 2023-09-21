import { FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap/";
import { Participant } from "../../../../models/Trip";
import { NewNotification, UserSummary } from "../../../../models/UserProfile";
import { addNewParticipantToTrip } from "../../../../services/tripServices";
import { addNotification } from "../../../../services/userProfileServices";
import { getFriends } from "../../../../utils/explorerFunctions";
import { createTripRequestNotif } from "../../../../utils/notificationsFunctions";
import InviteFriendCheckbox from "./InviteFriendCheckbox";

import "./InviteFriendsModal.css";

interface Props {
  uid: string;
  followers: UserSummary[];
  followings: UserSummary[];
  tripId: string;
  participants: Participant[];
  refreshTrip: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const InviteFriendsModal = ({
  uid,
  followers,
  followings,
  tripId,
  participants,
  refreshTrip,
  show,
  handleClose,
}: Props) => {
  // variables
  const [filteredFriends, setFilteredFriends] = useState<UserSummary[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

  // functions
  useEffect(() => {
    const friends: UserSummary[] = getFriends(followers, followings);

    setFilteredFriends(
      friends.filter(
        (friend) =>
          !participants.some(
            (participant) => participant.user.uid === friend.uid
          )
      )
    );
  }, [followers, followings, participants]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await Promise.all(
      invitedFriends.map((friend) => {
        const newNotification: NewNotification = createTripRequestNotif(
          uid,
          tripId
        );

        return Promise.allSettled([
          addNotification(friend, newNotification),
          addNewParticipantToTrip(tripId, { uid: friend, accepted: false }),
          setInvitedFriends([]),
        ]);
      })
    );

    await refreshTrip();

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