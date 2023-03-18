import UserProfile from "../../../models/UserProfile";
import FavoriteCard from "./FavoriteCard";
import "./FavoritesContainer.css";
import HometownCard from "./HometownCard";

interface Props {
  userProfile: UserProfile;
}

const FavoritesContainer = ({ userProfile }: Props) => {
  return (
    <ul className="FavoritesContainer">
      <HometownCard hometownId={userProfile.hometownId!} />
      {userProfile.likesCityIds.map((cityId) => (
        <FavoriteCard key={cityId} cityId={cityId} />
      ))}
    </ul>
  );
};

export default FavoritesContainer;
