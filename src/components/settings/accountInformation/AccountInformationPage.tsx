import { ListGroup } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import "./AccountInformationPage.css";
import UpdatePhoto from "./UpdatePhoto";
import HometownSettings from "./HometownSettings";
import PhoneSettings from "./PhoneSettings";

const AccountInformationPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);

  return (
    <>
      {userProfile && (
        <main className="AccountMain">
          <UpdatePhoto
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
          <h2 className="username">{userProfile.username}</h2>
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
        </main>
      )}
    </>
  );
};

export default AccountInformationPage;
