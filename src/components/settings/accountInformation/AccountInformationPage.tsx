import { ListGroup } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import "./AccountInformationPage.css";
import UpdatePhoto from "./UpdatePhoto";
import HometownSettings from "./HometownSettings";
import PhoneSettings from "./PhoneSettings";

const AccountInformationPage = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <>
      <header className="AccountHeader">
        <h1>settings / account</h1>
      </header>
      {userProfile && (
        <main className="AccountMain">
          <UpdatePhoto userProfile={userProfile} />
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
              <PhoneSettings userProfile={userProfile} />
            </ListGroup.Item>
            <ListGroup.Item>
              <HometownSettings userProfile={userProfile} />
            </ListGroup.Item>
          </ListGroup>
        </main>
      )}
    </>
  );
};

export default AccountInformationPage;
