import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { updateUserProfile } from "../../services/userService";
import ActiveUserProfile, { UserProfile } from "../../models/UserProfile";
import City from "../../models/City";
import "./ThumbsContainer.css";
import { formatUserProfileToSave } from "../../utils/userFunctions";

interface Props {
  city: City;
  userProfile: ActiveUserProfile;
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
    const formattedProfile: UserProfile = formatUserProfileToSave(userProfile);
    formattedProfile.favoriteCityIds.push(city._id!);

    await updateUserProfile(formattedProfile);
    await refreshProfile();

    navigateDetails && navigateDetails(city._id!);
  };

  const handleDislikeCity = async (): Promise<void> => {
    userProfile.hiddenCityIds.push(city._id!);

    const formattedProfile: UserProfile = formatUserProfileToSave(userProfile);
    await updateUserProfile(formattedProfile);
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
