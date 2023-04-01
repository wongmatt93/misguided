import "./WelcomeView.css";
import UserProfile, { Preferences } from "../../models/UserProfile";
import { FormEvent, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";
import City from "../../models/City";
import useFetchAllCities from "../../hooks/useFetchAllCities";
import { addNewUser, getUserByUsername } from "../../services/userService";
import PreferencesCheckboxes from "./PreferencesCheckboxes";
import { RiPlaneFill } from "react-icons/ri";

interface Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
}

const WelcomeView = ({ userProfile, setUserProfile }: Props) => {
  const cities: City[] = useFetchAllCities();
  const [stage, setStage] = useState("username");
  const [username, setUsername] = useState("");
  const [taken, setTaken] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [hometownId, setHometownId] = useState("");
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // const start = width * 0.2;
  // const end = width * 0.8;
  // const length = height * 1.2;
  // console.log(start, end, length);

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
    if (profilePic) {
      setStage("hometown");
    } else {
      const files = fileInputRef.current?.files;

      if (files && files[0]) {
        const file = files[0];
        const storageRef = ref(
          storage,
          `user-photos/${userProfile.uid}/${file.name}`
        );
        const snapshot: UploadResult = await uploadBytes(storageRef, file);
        setProfilePic(await getDownloadURL(snapshot.ref));
      }
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (username && profilePic && hometownId && preferences) {
      const formData = { ...userProfile };
      formData.username = username;
      formData.photoURL = profilePic;
      formData.hometownId = hometownId;
      formData.preferences = preferences;

      addNewUser(formData);
      setUserProfile(formData);
    }
  };

  return (
    <section className="WelcomeView">
      {stage !== "createAccount" && (
        <h1 className="animate__animated animate__fadeInDown animate__fast">
          welcome to misguided
        </h1>
      )}
      {stage === "createAccount" && (
        <>
          <h1 className="create-view animate__animated animate__fadeInDown animate__fast">
            you're almost ready!
          </h1>
          <p className="welcome-paragraph create-view animate__animated animate__fadeIn animate__delay-1s">
            Take some time and review everything. Once everything is set, click
            Continue to begin your misadventures.
          </p>
        </>
      )}

      <Form className="UsernameForm " onSubmit={(e) => handleSubmit(e)}>
        {stage === "username" && (
          <Form.Group
            className="form-username animate__animated animate__fadeIn animate__delay-1s"
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
            <Form.Text style={{ display: profilePic ? "block" : "none" }}>
              Picture Uploaded!
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
                disabled={profilePic ? false : true}
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
      {/* <RiPlaneFill className="plane plane-1" /> */}
      {/* <RiPlaneFill className="plane plane-2" /> */}
    </section>
  );
};

export default WelcomeView;
