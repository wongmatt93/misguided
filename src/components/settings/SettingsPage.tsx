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
      {userProfile && (
        <section className="SettingsPage">
          <div className="user-info">
            <img
              src={userProfile.photoURL!}
              alt={userProfile.photoURL!}
              className="circle-image"
            />
            <div className="user-name">
              <p>{userProfile.username}</p>
              <p>{userProfile.email}</p>
            </div>
          </div>
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
        </section>
      )}
    </>
  );
};

export default SettingsPage;
