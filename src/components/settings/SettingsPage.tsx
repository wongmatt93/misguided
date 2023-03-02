import { RiArrowRightSLine } from "react-icons/ri";
import { useContext } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { signOut } from "../../firebaseConfig";
import "./SettingsPage.css";

const SettingsPage = () => {
  const { userProfile, setUserProfile } = useContext(AuthContext);

  const signOutAction = (): void => {
    signOut();
    setUserProfile(undefined);
  };

  return (
    <>
      <header className="SettingsHeader">
        <h1>settings</h1>
      </header>
      {userProfile && (
        <main className="SettingsMain">
          <ListGroup variant="flush">
            <ListGroup.Item as={Link} to="/settings/account">
              <p>Account Information</p>
              <RiArrowRightSLine />
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/settings/preferences">
              <p>Update Preferences</p>
              <RiArrowRightSLine />
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/settings/notifications">
              <p>Notifications</p>
              <RiArrowRightSLine />
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/settings/add-city">
              <p>Add Cities</p>
              <RiArrowRightSLine />
            </ListGroup.Item>
          </ListGroup>
          <Button variant="warning" onClick={signOutAction}>
            Sign Out
          </Button>
        </main>
      )}
    </>
  );
};

export default SettingsPage;
