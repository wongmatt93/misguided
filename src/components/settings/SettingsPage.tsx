import { RiArrowRightSLine } from "react-icons/ri";
import { useContext } from "react";
import { Button } from "react-bootstrap";
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
      <main className="SettingsMain">
        {userProfile && (
          <div className="contents">
            <img src={userProfile.photoURL!} alt="profile-pic" />
            <h2>{userProfile.displayName}</h2>
            <ul>
              <Link to="/settings/account">
                <li>
                  <p>Account Information</p>
                  <RiArrowRightSLine />
                </li>
              </Link>
              <Link to="/settings/preferences">
                <li>
                  <p>Update Preferences</p>
                  <RiArrowRightSLine />
                </li>
              </Link>
              <Link to="/add-city">
                <li>
                  <p>Add Cities</p>
                  <RiArrowRightSLine />
                </li>
              </Link>
            </ul>
            <Button variant="warning" onClick={signOutAction}>
              Sign Out
            </Button>
          </div>
        )}
      </main>
    </>
  );
};

export default SettingsPage;
