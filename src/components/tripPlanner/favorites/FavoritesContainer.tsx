import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import FavoriteCard from "./FavoriteCard";
import "./FavoritesContainer.css";
import HometownCard from "./HometownCard";

const FavoritesContainer = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <main>
      <ul className="FavoritesContainer">
        <HometownCard />
        {userProfile &&
          userProfile?.likes.map((liked) => (
            <FavoriteCard key={liked.cityId} liked={liked} />
          ))}
      </ul>
    </main>
  );
};

export default FavoritesContainer;
