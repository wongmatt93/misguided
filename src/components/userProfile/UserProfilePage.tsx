import { BsChevronCompactRight } from "react-icons/bs";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { signOut } from "../../firebaseConfig";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(AuthContext);

  const signOutAction = (): void => {
    signOut();
    setUserProfile(undefined);
  };

  return (
    <main className="UserProfilePage">
      {userProfile && (
        <div className="contents">
          <img src={userProfile.photoURL!} alt="profile-pic" />
          <h2>{userProfile.displayName}</h2>
          <ul>
            <Link to="/account">
              <li>
                <p>Account Information</p>
                <BsChevronCompactRight />
              </li>
            </Link>
            <Link to="/preferences">
              <li>
                <p>Update Preferences</p>
                <BsChevronCompactRight />
              </li>
            </Link>
            <Link to="/add-city">
              <li>
                <p>Add Cities</p>
                <BsChevronCompactRight />
              </li>
            </Link>
          </ul>
          <Button variant="warning" onClick={signOutAction}>
            Sign Out
          </Button>
        </div>
      )}
    </main>
  );
};

export default UserProfilePage;
