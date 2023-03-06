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
        userProfile.likesCityIds.map((cityId) => (
          <FavoriteCard key={cityId} cityId={cityId} />
        ))}
    </ul>
  );
};

export default FavoritesContainer;
