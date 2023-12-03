import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Message, Participant } from "../../../../models/Trip";
import { addMessageToTrip } from "../../../../services/tripServices";
import { addNotification } from "../../../../services/userProfileServices";
import "./NewTripMessageForm.css";

interface Props {
  uid: string;
  tripId: string;
  participants: Participant[];
  refreshProfile: () => Promise<void>;
}

const NewTripMessageForm = ({
  uid,
  tripId,
  participants,
  refreshProfile,
}: Props) => {
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
    const sendNotifs = await Promise.allSettled(
      participants
        .filter((participant) => participant.user.uid !== uid)
        .map((participant) =>
          addNotification(
            participant.user.uid,
            uid,
            "tripMessage",
            Date.now().toString(),
            tripId
          )
        )
    );
    await Promise.allSettled([
      addMessageToTrip(tripId, newMessage),
      sendNotifs,
    ]);
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
