import useGetUserByUid from "../../../hooks/useGetUserByUid";
import UserProfile from "../../../models/UserProfile";
import "./LikesCard.css";

interface Props {
  uid: string;
}

const LikesCard = ({ uid }: Props) => {
  const userProfile: UserProfile | null = useGetUserByUid(uid);

  return (
    <li className="LikesCard">
      {userProfile && (
        <>
          <img
            className="liker-image"
            src={userProfile.photoURL!}
            alt={userProfile.photoURL!}
          />
          <h4>{userProfile.displayName}</h4>
        </>
      )}
    </li>
  );
};

export default LikesCard;
