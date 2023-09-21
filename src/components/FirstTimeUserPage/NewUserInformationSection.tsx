import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import { FormEvent, useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CityContext from "../../context/CityContext";
import { storage } from "../../firebaseConfig";
import {
  NewUserTemplate,
  Preferences,
  UserProfile,
} from "../../models/UserProfile";
import {
  addNewUser,
  getUserByUsername,
} from "../../services/userProfileServices";
import "./NewUserInformationSection.css";
import PreferencesCheckboxes from "./PreferencesCheckboxes";

interface Props {
  firstTimeUser: NewUserTemplate;
  refreshProfile: () => Promise<void>;
}

const NewUserInformationSection = ({
  firstTimeUser,
  refreshProfile,
}: Props) => {
  // variables
  const { cities } = useContext(CityContext);
  const [stage, setStage] = useState("username");
  const [username, setUsername] = useState("");
  const [taken, setTaken] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [hometownId, setHometownId] = useState("");
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // functions
  const verifyUsername = async (): Promise<void> => {
    if (username) {
      const match: UserProfile | undefined = await getUserByUsername(username);
      if (match) {
        setTaken(true);
      } else {
        setTaken(false);
        setStage("profilePic");
      }
    }
  };

  const uploadPhoto = async (): Promise<void> => {
    setUploading(true);
    const files = fileInputRef.current?.files;

    if (files && files[0]) {
      const file = files[0];
      const storageRef = ref(
        storage,
        `user-photos/${firstTimeUser.uid}/${file.name}`
      );
      const snapshot: UploadResult = await uploadBytes(storageRef, file);
      setPhotoURL(await getDownloadURL(snapshot.ref));
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (username && photoURL && hometownId && preferences) {
      const newUser: NewUserTemplate = {
        ...firstTimeUser,
        username,
        photoURL,
        hometownId,
        preferences,
      };

      await addNewUser(newUser);
      await refreshProfile();
      navigate("/welcome-guide");
    }
  };

  return (
    <section className="NewUserInformationSection">
      {stage !== "createAccount" && (
        <h1 className="animate__animated animate__fadeInDown animate__fast">
          welcome to misguided
        </h1>
      )}
      {stage === "createAccount" && (
        <>
          <h1 className="create-view animate__animated animate__fadeInDown animate__fast">
            you're ready to begin!
          </h1>
          <p className="welcome-paragraph create-view animate__animated animate__fadeIn">
            Take some time and review everything if needed. Once everything is
            set, click Continue to begin your journey.
          </p>
        </>
      )}

      <Form className="UsernameForm " onSubmit={(e) => handleSubmit(e)}>
        {stage === "username" && (
          <Form.Group
            className="form-username animate__animated animate__fadeIn"
            controlId="username"
          >
            <Form.Label>Pick a username to begin</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
              required
            ></Form.Control>
            <Form.Control.Feedback
              style={{ display: taken ? "block" : "none" }}
              type="invalid"
            >
              Username has been taken
            </Form.Control.Feedback>
            <Button
              variant="warning"
              type="button"
              disabled={username ? false : true}
              onClick={verifyUsername}
            >
              Next
            </Button>
          </Form.Group>
        )}

        {stage === "profilePic" && (
          <Form.Group
            className="form-profile-pic animate__animated animate__fadeIn"
            controlId="profile-pic"
          >
            <Form.Label>Please upload a profile picture</Form.Label>
            <Form.Control
              ref={fileInputRef}
              type="file"
              onChange={uploadPhoto}
            />
            <Form.Text
              style={{ display: uploading || photoURL ? "block" : "none" }}
            >
              {uploading ? "Uploading..." : "Picture Uploaded!"}
            </Form.Text>
            <div className="button-container">
              <Button
                variant="warning"
                type="button"
                onClick={() => setStage("username")}
              >
                Back
              </Button>
              <Button
                variant="warning"
                type="button"
                disabled={photoURL ? false : true}
                onClick={() => setStage("hometown")}
              >
                Next
              </Button>
            </div>
          </Form.Group>
        )}

        {stage === "hometown" && (
          <Form.Group
            className="form-hometown animate__animated animate__fadeIn"
            controlId="hometown"
          >
            <Form.Label>Please select your hometown</Form.Label>
            <Form.Select
              value={hometownId}
              onChange={(e) => setHometownId(e.target.value)}
            >
              <option value="">-- Select Your Hometown --</option>
              {cities.sort().map((city) => (
                <option key={city.cityCode} value={city._id!}>
                  {city.cityName}
                </option>
              ))}
            </Form.Select>
            <div className="button-container">
              <Button
                variant="warning"
                type="button"
                onClick={() => setStage("profilePic")}
              >
                Back
              </Button>
              <Button
                variant="warning"
                type="button"
                disabled={hometownId ? false : true}
                onClick={() => setStage("preferences")}
              >
                Next
              </Button>
            </div>
          </Form.Group>
        )}

        {stage === "preferences" && (
          <PreferencesCheckboxes
            preferences={preferences}
            setPreferences={setPreferences}
            setStage={setStage}
          />
        )}

        {stage === "createAccount" && (
          <div className="create-view create-button-container">
            <Button
              variant="warning"
              type="button"
              onClick={() => setStage("preferences")}
            >
              Back
            </Button>
            <Button variant="warning" type="submit">
              Continue
            </Button>
          </div>
        )}
      </Form>
    </section>
  );
};

export default NewUserInformationSection;
