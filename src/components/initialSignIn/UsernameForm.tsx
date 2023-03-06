import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserProfile from "../../models/UserProfile";
import { getUserByUsername, updateUsername } from "../../services/userService";
import "./UsernameForm.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const UsernameForm = ({ userProfile, refreshProfile, setStage }: Props) => {
  const [username, setUsername] = useState("");
  const [taken, setTaken] = useState(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    getUserByUsername(username).then((response) => {
      if (response) {
        setTaken(true);
      } else {
        setTaken(false);
        updateUsername(userProfile.uid, username).then(() =>
          refreshProfile().then(() => setStage("image"))
        );
      }
    });
  };

  return (
    <div className="UsernameForm">
      <h2>Welcome to Misguided</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
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
        </Form.Group>
        <Button variant="warning" type="submit" className="search-button">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UsernameForm;
