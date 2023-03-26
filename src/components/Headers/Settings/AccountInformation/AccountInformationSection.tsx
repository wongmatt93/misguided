import { Button, ListGroup } from "react-bootstrap";
import "./AccountInformationSection.css";
import PhoneSettings from "./PhoneSettings";
import HometownSettings from "./HometownSettings";
import UserProfile from "../../../../models/UserProfile";
import { deleteAccount } from "../../../../utils/userFunctions";
import { signOut } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  handleClose: () => void;
}

const AccountInformationSection = ({
  userProfile,
  refreshProfile,
  setUserProfile,
  handleClose,
}: Props) => {
  const navigate = useNavigate();

  const handleDeleteAccount = async (): Promise<void> => {
    navigate("/good-bye");
    handleClose();
    setUserProfile(undefined);
    signOut();
    await deleteAccount(userProfile);
  };

  return (
    <section className="AccountInformationSection">
      <ListGroup className="account-items-list" variant="flush">
        <ListGroup.Item>
          <div className="label">name</div>
          <div>{userProfile.displayName}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="label">email</div>
          <div>{userProfile.email}</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <PhoneSettings
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          <HometownSettings
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        </ListGroup.Item>
      </ListGroup>

      <Button variant="link" onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </section>
  );
};

export default AccountInformationSection;
