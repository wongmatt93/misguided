import { useContext } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import DiscoverContext from "../../context/DiscoverContext";
import City from "../../models/City";
import UserProfile, { CityVote } from "../../models/UserProfile";
import "./CityDetailsButtonsContainer.css";

interface Props {
  city: City;
  userProfile: UserProfile;
  goBack: () => void;
}

const CityDetailsButtonsContainer = ({ city, userProfile, goBack }: Props) => {
  const { likeCity, dislikeCity } = useContext(DiscoverContext);

  const handleLikeCity = async (uid: string, cityId: string): Promise<void> => {
    const newLike: CityVote = { cityId };

    await likeCity(uid, newLike);
  };

  const handleDislikeCity = async (
    uid: string,
    cityId: string
  ): Promise<void> => {
    const newDislike: CityVote = { cityId };

    await dislikeCity(uid, newDislike);
    goBack();
  };

  return (
    <div className="CityDetailsButtonsContainer">
      <AiFillLike
        className="thumbs"
        onClick={() => handleLikeCity(userProfile.uid, city._id!)}
      />
      <AiFillDislike
        className="thumbs"
        onClick={() => handleDislikeCity(userProfile.uid, city._id!)}
      />
    </div>
  );
};

export default CityDetailsButtonsContainer;