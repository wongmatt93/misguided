import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Preferences } from "../../../../../models/UserProfile";
import PreferencesForm from "./PreferencesForm";
import "./PreferencesSection.css";

interface Props {
  uid: string;
  preferences: Preferences;
  refreshProfile: () => Promise<void>;
}

const PreferencesSection = ({ uid, preferences, refreshProfile }: Props) => {
  // variables
  const [show, setShow] = useState(false);

  return (
    <div className="PreferencesSection">
      <PreferencesForm
        uid={uid}
        preferences={preferences}
        refreshProfile={refreshProfile}
        setShow={setShow}
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
    </div>
  );
};

export default PreferencesSection;
