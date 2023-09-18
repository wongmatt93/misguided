import { Offcanvas } from "react-bootstrap";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Message, Participant } from "../../../../models/Trip";
import NewTripMessageForm from "./NewTripMessageForm";
import TripMessage from "./TripMessage";
import "./TripMessagesOffcanvas.css";

interface Props {
  uid: string;
  tripId: string;
  tripName: string;
  messages: Message[];
  participants: Participant[];
  refreshProfile: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const TripMessagesOffcanvas = ({
  uid,
  tripId,
  tripName,
  messages,
  participants,
  refreshProfile,
  show,
  handleClose,
}: Props) => {
  return (
    <Offcanvas
      className="TripMessagesOffcanvas"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h1>{tripName}</h1>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message) => (
              <TripMessage
                key={message.date + message.uid}
                uid={uid}
                message={message}
                participants={participants}
              />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <RiQuestionAnswerFill />
            <p>No messages yet</p>
            <p>Start chatting about your upcoming trip!</p>
          </div>
        )}
        <NewTripMessageForm
          uid={uid}
          tripId={tripId}
          participants={participants}
          refreshProfile={refreshProfile}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TripMessagesOffcanvas;
