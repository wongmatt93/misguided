import { useContext, useState } from "react";
import { Offcanvas, ListGroup, Button } from "react-bootstrap";
import { RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri";
import CityContext from "../../../../context/CityContext";
import { signOut } from "../../../../firebaseConfig";
import { UserProfile } from "../../../../models/UserProfile";
import AccountInformationSection from "./AccountInformation/AccountInformationSection";
import AddCitySection from "./Admin/AddCitySection";
import PreferencesSection from "./Preferences/PreferencesSection";
import "./SettingsOffcanvas.css";
import UpdatePhoto from "./UpdatePhoto";

interface Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  refreshProfile: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const SettingsOffcanvas = ({
  userProfile,
  setUserProfile,
  refreshProfile,
  show,
  handleClose,
}: Props) => {
  // variables
  const { cities } = useContext(CityContext);
  const [page, setPage] = useState("default");
  const { uid, username, photoURL, preferences } = userProfile;

  // functions
  const signOutAction = (): void => {
    signOut();
    setUserProfile(null);
  };

  const closeAction = (): void => {
    handleClose();
    setPage("default");
  };

  return (
    <Offcanvas
      className="SettingsOffcanvas"
      show={show}
      onHide={closeAction}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h1>settings{page !== "default" && ` / ${page}`}</h1>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {page !== "default" && (
          <div className="back-arrow" onClick={() => setPage("default")}>
            <RiArrowLeftLine />
            <p>Back</p>
          </div>
        )}
        {page === "default" && (
          <>
            <UpdatePhoto
              uid={uid}
              photoURL={photoURL!}
              refreshProfile={refreshProfile}
            />
            <h3 className="username">{username}</h3>
            <ListGroup className="default-list-group" variant="flush">
              <ListGroup.Item onClick={() => setPage("account")}>
                <p>Account Information</p>
                <RiArrowRightSLine />
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setPage("preferences")}>
                <p>Update Preferences</p>
                <RiArrowRightSLine />
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setPage("notifications")}>
                <p>Notifications</p>
                <RiArrowRightSLine />
              </ListGroup.Item>
              {uid === "M19dza3zi4RmsNiDtEtLtKcSewl1" && (
                <ListGroup.Item onClick={() => setPage("admin")}>
                  <p>Add Cities</p>
                  <RiArrowRightSLine />
                </ListGroup.Item>
              )}
            </ListGroup>
            <Button
              className="sign-out-button"
              variant="warning"
              onClick={signOutAction}
            >
              Sign Out
            </Button>
          </>
        )}
        {page === "account" && (
          <AccountInformationSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            refreshProfile={refreshProfile}
            cities={cities}
            handleClose={handleClose}
          />
        )}
        {page === "preferences" && (
          <PreferencesSection
            uid={uid}
            preferences={preferences!}
            refreshProfile={refreshProfile}
          />
        )}
        {page === "admin" && <AddCitySection />}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SettingsOffcanvas;
