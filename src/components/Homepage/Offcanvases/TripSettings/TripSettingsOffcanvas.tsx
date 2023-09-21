import { Offcanvas } from "react-bootstrap";
import TripSettingsForm from "./TripSettingsForm";
import "./TripSettingsOffcanvas.css";

interface Props {
  refreshProfile: () => Promise<void>;
  tripId: string;
  nickname: string;
  refreshTrip: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const TripSettingsOffcanvas = ({
  refreshProfile,
  tripId,
  nickname,
  refreshTrip,
  show,
  handleClose,
}: Props) => {
  return (
    <Offcanvas
      className="TripSettingsOffcanvas"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h1>trip settings</h1>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <TripSettingsForm
          refreshProfile={refreshProfile}
          tripId={tripId}
          currentNickname={nickname}
          refreshTrip={refreshTrip}
          handleClose={handleClose}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TripSettingsOffcanvas;
