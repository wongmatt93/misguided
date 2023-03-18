import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { addDislikedCity, addLikedCity } from "../../services/userService";
import City from "../../models/City";
import "./ThumbsContainer.css";

interface Props {
  city: City;
  uid: string;
  refreshProfile: () => Promise<void>;
  navigateDetails?: (cityId: string) => void;
  goBack?: () => void;
}

const ThumbsContainer = ({
  city,
  uid,
  refreshProfile,
  navigateDetails,
  goBack,
}: Props) => {
  const handleLikeCity = async (): Promise<void> => {
    await addLikedCity(uid, city._id!);
    await refreshProfile();

    navigateDetails && navigateDetails(city._id!);
  };

  const handleDislikeCity = async (): Promise<void> => {
    await addDislikedCity(uid, city._id!);
    await refreshProfile();

    goBack && goBack();
  };

  return (
    <div className="ThumbsContainer">
      <RiThumbUpFill className="thumbs" onClick={handleLikeCity} />
      <RiThumbDownFill className="thumbs" onClick={handleDislikeCity} />
    </div>
  );
};

export default ThumbsContainer;
