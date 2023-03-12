import { FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Trip from "../../../models/Trip";
import { updateNickname } from "../../../services/tripServices";
import "./EditNicknameModal.css";

interface Props {
  trip: Trip;
  refreshTrip: (tripId: string) => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const EditNicknameModal = ({ trip, refreshTrip, show, handleClose }: Props) => {
  const [nickname, setNickname] = useState(trip.nickname);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await updateNickname(trip._id!, nickname);
    await refreshTrip(trip._id!);
    handleClose();
  };

  return (
    <Modal className="EditNickNamModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Nickname</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="nickname">
            <Form.Control
              maxLength={21}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
          {nickname.length >= 21 && (
            <Form.Text>Max Character Length Reached</Form.Text>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" type="submit">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNicknameModal;
