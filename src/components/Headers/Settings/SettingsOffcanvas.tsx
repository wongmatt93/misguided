import { useContext, useState } from "react";
import { Button, Offcanvas, ListGroup } from "react-bootstrap";
import { RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri";
import AuthContext from "../../../context/AuthContext";
import { signOut } from "../../../firebaseConfig";
import UserProfile from "../../../models/UserProfile";
import AccountInformationSection from "./AccountInformation/AccountInformationSection";
import AddCitySection from "./Admin/AddCitySection";
import PreferencesSection from "./Preferences/PreferencesSection";
import "./SettingsOffcanvas.css";
import UpdatePhoto from "./UpdatePhoto";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const SettingsOffcanvas = ({
  userProfile,
  refreshProfile,
  show,
  handleClose,
}: Props) => {
  const { setUserProfile } = useContext(AuthContext);
  const [page, setPage] = useState("default");

  const signOutAction = (): void => {
    signOut();
    setUserProfile(undefined);
  };

  return (
    <Offcanvas
      className="SettingsOffcanvas"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h2>settings{page !== "default" && ` / ${page}`}</h2>
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
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
            <h3 className="username">{userProfile.username}</h3>
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
              <ListGroup.Item onClick={() => setPage("admin")}>
                <p>Add Cities</p>
                <RiArrowRightSLine />
              </ListGroup.Item>
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
            refreshProfile={refreshProfile}
            setUserProfile={setUserProfile}
            handleClose={handleClose}
          />
        )}
        {page === "preferences" && (
          <PreferencesSection
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        )}
        {page === "admin" && <AddCitySection />}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SettingsOffcanvas;
