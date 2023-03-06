import { FormEvent, useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { Message } from "../../models/Trip";
import UserProfile, { Notification } from "../../models/UserProfile";
import { addMessageToTrip, getTripById } from "../../services/tripServices";
import {
  addNotification,
  getAllUsersByUidArray,
} from "../../services/userService";
import { createTripMessageNotif } from "../../utils/notificationsFunctions";
import "./NewMessageForm.css";

interface Props {
  tripId: string;
  refreshTrip: (tripId: string) => Promise<void>;
}

const NewMessageForm = ({ tripId, refreshTrip }: Props) => {
  const { userProfile } = useContext(AuthContext);
  const [participants, setParticipants] = useState<UserProfile[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getTripById(tripId).then((response) => {
      const userUids: string[] = [];
      response.participantsUids.forEach((participant) => {
        if (participant !== userProfile!.uid) userUids.push(participant);
      });
      getAllUsersByUidArray(userUids).then((response) =>
        setParticipants(response)
      );
    });
  }, [userProfile, tripId]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const newMessage: Message = {
      uid: userProfile!.uid,
      text,
      date: Date.now().toString(),
    };

    const newNotification: Notification = createTripMessageNotif(
      userProfile!.uid,
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
