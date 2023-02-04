import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LikedCard from "./LikedCard";
import "./LikesList.css";

const LikesList = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <ul className="LikesList">
      {userProfile &&
        userProfile?.likes.map((liked) => (
          <LikedCard key={liked.cityId} liked={liked} />
        ))}
    </ul>
  );
};

export default LikesList;
