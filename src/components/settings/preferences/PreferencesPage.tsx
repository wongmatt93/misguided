import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import PreferencesForm from "./PreferencesForm";
import "./PreferencesPage.css";
import UserProfile from "../../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const PreferencesPage = ({ userProfile, refreshProfile }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <section className="PreferencesPage">
      <PreferencesForm
        setShow={setShow}
        userProfile={userProfile}
        refreshProfile={refreshProfile}
      />
      <ToastContainer position="top-center">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          bg="warning"
          style={{ marginTop: "1em", textAlign: "center" }}
          autohide
        >
          <Toast.Body>Your preferences have been saved</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  );
};

export default PreferencesPage;
