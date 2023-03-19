import { ListGroup } from "react-bootstrap";
import "./AccountInformationSection.css";
import PhoneSettings from "./PhoneSettings";
import HometownSettings from "./HometownSettings";
import UserProfile from "../../../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const AccountInformationSection = ({ userProfile, refreshProfile }: Props) => {
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
    </section>
  );
};

export default AccountInformationSection;
