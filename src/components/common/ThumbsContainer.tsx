import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { updateUserProfile } from "../../services/userService";
import UserProfile from "../../models/UserProfile";
import City from "../../models/City";
import "./ThumbsContainer.css";

interface Props {
  city: City;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  navigateDetails?: (cityId: string) => void;
  goBack?: () => void;
}

const ThumbsContainer = ({
  city,
  userProfile,
  refreshProfile,
  navigateDetails,
  goBack,
}: Props) => {
  const handleLikeCity = async (): Promise<void> => {
    userProfile.likesCityIds.push(city._id!);

    await updateUserProfile(userProfile);
    await refreshProfile();

    navigateDetails && navigateDetails(city._id!);
  };

  const handleDislikeCity = async (): Promise<void> => {
    userProfile.dislikesCityIds.push(city._id!);

    await updateUserProfile(userProfile);
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
