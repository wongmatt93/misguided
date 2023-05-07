import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { UserProfile } from "../../../../models/UserProfile";
import "./InviteFriendCheckbox.css";

interface Props {
  friend: UserProfile;
  invitedFriends: string[];
  setInvitedFriends: React.Dispatch<React.SetStateAction<string[]>>;
}

const InviteFriendCheckbox = ({
  friend,
  invitedFriends,
  setInvitedFriends,
}: Props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      // adds task id to array when checked
      setInvitedFriends((prev) => {
        return [...prev, friend.uid];
      });
    } else {
      // finds index number for checked item
      const index: number = invitedFriends.findIndex(
        (item) => item === friend.uid
      );

      // removes checked item from array when box is unchecked
      if (index !== -1) {
        setInvitedFriends((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div className="InviteFriendCheckbox">
      <input
        type="checkbox"
        name={friend.uid}
        id={friend.uid}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor={friend.uid}>
        <div className="image-container">
          <img src={friend.photoURL!} alt={friend.photoURL!} />
          <BsCheckLg />
        </div>
        <p>{friend.username}</p>
      </label>
    </div>
  );
};

export default InviteFriendCheckbox;
