import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import FavoriteCard from "./FavoriteCard";
import "./FavoritesContainer.css";
import HometownCard from "./HometownCard";

const FavoritesContainer = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <ul className="FavoritesContainer">
      <HometownCard />
      {userProfile &&
        userProfile?.likes.map((liked) => (
          <FavoriteCard key={liked.cityId} liked={liked} />
        ))}
    </ul>
  );
};

export default FavoritesContainer;
