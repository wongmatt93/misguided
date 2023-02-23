import { FormEvent, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { Message } from "../../models/Trip";
import { addMessageToTrip } from "../../services/tripServices";
import "./NewMessageForm.css";

interface Props {
  tripId: string;
  refreshTrip: (tripId: string) => Promise<void>;
}

const NewMessageForm = ({ tripId, refreshTrip }: Props) => {
  const { userProfile } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const newMessage: Message = {
      uid: userProfile!.uid,
      text,
      date: Date.now().toString(),
    };

    setSending(true);
    await addMessageToTrip(tripId, newMessage);
    await refreshTrip(tripId);
    setSending(false);
    setText("");
  };

  return (
    <Form className="NewMessageForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="message">
        <Form.Control
          type="text"
          placeholder="new message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="warning" type="submit" disabled={sending ? true : false}>
        Submit
      </Button>
    </Form>
  );
};

export default NewMessageForm;
