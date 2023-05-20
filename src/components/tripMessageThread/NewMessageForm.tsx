import { FormEvent, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Message, Participant } from "../../models/Trip";
import { Notification } from "../../models/UserProfile";
import { addMessageToTrip, getFullTripById } from "../../services/tripServices";
import { addNotification } from "../../services/userService";
import { createTripMessageNotif } from "../../utils/notificationsFunctions";
import "./NewMessageForm.css";

interface Props {
  tripId: string;
  userUid: string;
  refreshTrip: (tripId: string) => Promise<void>;
}

const NewMessageForm = ({ tripId, userUid, refreshTrip }: Props) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getFullTripById(tripId).then((response) => {
      setParticipants(response.participants);
    });
  }, [userUid, tripId]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const newMessage: Message = {
      uid: userUid,
      text,
      date: Date.now().toString(),
    };

    const newNotification: Notification = createTripMessageNotif(
      userUid,
      tripId
    );

    setSending(true);
    const sendNotifs = await Promise.allSettled(
      participants.map((participant) =>
        addNotification(participant.uid, newNotification)
      )
    );
    await Promise.allSettled([
      addMessageToTrip(tripId, newMessage),
      sendNotifs,
    ]);
    await refreshTrip(tripId);
    setSending(false);
    setText("");
  };

  return (
    <Form className="NewMessageForm" onSubmit={handleSubmit}>
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

export default NewMessageForm;
