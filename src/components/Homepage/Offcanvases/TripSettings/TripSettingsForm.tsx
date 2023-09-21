import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateNickname } from "../../../../services/tripServices";
import "./TripSettingsForm.css";

interface Props {
  refreshProfile: () => Promise<void>;
  tripId: string;
  currentNickname: string;
  refreshTrip: () => Promise<void>;
  handleClose: () => void;
}

const TripSettingsForm = ({
  refreshProfile,
  tripId,
  currentNickname,
  refreshTrip,
  handleClose,
}: Props) => {
  // variables
  const [nickname, setNickname] = useState<string>(currentNickname);
  const [updating, setUpdating] = useState<boolean>(false);

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    setUpdating(true);

    await updateNickname(tripId, nickname);
    await refreshTrip();
    await refreshProfile();
    handleClose();

    setUpdating(false);
  };

  return (
    <Form className="TripSettingsForm" onSubmit={handleSubmit}>
      <Form.Group controlId="trip-name">
        <Form.Label>Update Trip Nickname</Form.Label>
        <Form.Control
          type="text"
          placeholder={nickname}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        variant="warning"
        type="submit"
        disabled={updating || currentNickname === nickname ? true : false}
      >
        Update
      </Button>
    </Form>
  );
};

export default TripSettingsForm;
