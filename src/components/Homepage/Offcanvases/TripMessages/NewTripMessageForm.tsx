import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Message } from "../../../../models/Trip";
import { addMessageToTrip } from "../../../../services/tripServices";
import "./NewTripMessageForm.css";

interface Props {
  uid: string;
  tripId: string;
  refreshProfile: () => Promise<void>;
}

const NewTripMessageForm = ({ uid, tripId, refreshProfile }: Props) => {
  // variables
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const newMessage: Message = {
      uid,
      text,
      date: Date.now().toString(),
    };

    setSending(true);

    await addMessageToTrip(tripId, newMessage, uid);
    await refreshProfile();
    setSending(false);
    setText("");
  };

  return (
    <Form className="NewTripMessageForm" onSubmit={handleSubmit}>
      <Form.Group controlId="message">
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

export default NewTripMessageForm;
