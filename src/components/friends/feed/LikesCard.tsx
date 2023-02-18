import { useEffect, useState } from "react";
import UserProfile from "../../../models/UserProfile";
import { getUserByUid } from "../../../services/userService";
import "./LikesCard.css";

interface Props {
  uid: string;
}

const LikesCard = ({ uid }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserByUid(uid).then((response) => setUserProfile(response));
  }, [uid]);

  return (
    <li className="LikesCard">
      {userProfile && (
        <>
          <img src={userProfile.photoURL!} alt={userProfile.photoURL!} />
          <h4>{userProfile.displayName}</h4>
        </>
      )}
    </li>
  );
};

export default LikesCard;
