import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import "./AccountInformationSection.css";
import HometownSettings from "./HometownSettings";
import PhoneSettings from "./PhoneSettings";
import { UserProfile } from "../../../../../models/UserProfile";
import { signOut } from "../../../../../firebaseConfig";
import City from "../../../../../models/City";
import { Trip } from "../../../../../models/Trip";
import { deleteUser } from "../../../../../services/userProfileServices";

interface Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  refreshProfile: () => Promise<void>;
  cities: City[];
  handleClose: () => void;
}

const AccountInformationSection = ({
  userProfile,
  setUserProfile,
  refreshProfile,
  cities,
  handleClose,
}: Props) => {
  // variables
  const navigate = useNavigate();
  const {
    uid,
    displayName,
    email,
    hometownId,
    phoneNumber,
    upcomingTrips,
    pastTrips,
    visitedCities,
  } = userProfile;

  // functions
  const handleDeleteAccount = async (): Promise<void> => {
    navigate("/good-bye");
    handleClose();
    setUserProfile(null);
    signOut();

    const allTrips: Trip[] = upcomingTrips.concat(pastTrips);
    await deleteUser(uid, allTrips, visitedCities);
  };

  return (
    <div className="AccountInformationSection">
      <ListGroup className="account-items-list" variant="flush">
        <ListGroup.Item>
          <div className="label">name</div>
          <div>{displayName}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="label">email</div>
          <div>{email}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <PhoneSettings
            uid={uid}
            userPhoneNumber={phoneNumber!}
            refreshProfile={refreshProfile}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          <HometownSettings
            uid={uid}
            hometownId={hometownId!}
            refreshProfile={refreshProfile}
            cities={cities}
          />
        </ListGroup.Item>
      </ListGroup>

      <Button variant="link" onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </div>
  );
};

export default AccountInformationSection;
