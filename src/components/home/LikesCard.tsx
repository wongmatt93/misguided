import useProfileFetcher from "../../hooks/useProfileFetcher";
import UserProfile from "../../models/UserProfile";
import "./LikesCard.css";

interface Props {
  uid: string;
}

const LikesCard = ({ uid }: Props) => {
  const userProfile: UserProfile | null = useProfileFetcher(uid);

  return (
    <li className="LikesCard">
      {userProfile && (
        <>
          <img
            className="liker-image"
            src={userProfile.photoURL!}
            alt={userProfile.photoURL!}
          />
          <h4>{userProfile.username}</h4>
        </>
      )}
    </li>
  );
};

export default LikesCard;
