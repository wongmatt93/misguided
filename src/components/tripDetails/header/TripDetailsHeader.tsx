import { RiEditFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Trip from "../../../models/Trip";
import { UserTrip } from "../../../models/UserProfile";
import EditNicknameModal from "./EditNicknameModal";
import "./TripDetailsHeader.css";

interface Props {
  trip: Trip;
  cityName: string;
  refreshTrip: (tripId: string) => Promise<void>;
  userTrips: UserTrip[];
  timesUp: boolean;
}

const TripDetailsHeader = ({
  trip,
  cityName,
  refreshTrip,
  userTrips,
  timesUp,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const match: UserTrip | undefined = userTrips.find(
      (userTrip) => userTrip.tripId === trip._id!
    );

    if (match) {
      setAccepted(match.accepted);
    }
  }, [trip, userTrips]);

  const handleShow = (): void => setShowModal(true);
  const handleClose = (): void => setShowModal(false);

  return (
    <>
      <header
        className="TripDetailsHeader"
        style={{ display: timesUp ? "flex" : "none" }}
      >
        <div
          className="name-container"
          onMouseEnter={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
        >
          <h1>
            {trip.nickname
              ? trip.nickname.toLowerCase()
              : cityName.toLowerCase()}
          </h1>
          {accepted && (
            <RiEditFill
              style={{ opacity: showEdit ? "1" : "0" }}
              onClick={handleShow}
            />
          )}
        </div>
        <EditNicknameModal
          trip={trip}
          refreshTrip={refreshTrip}
          show={showModal}
          handleClose={handleClose}
        />
      </header>
    </>
  );
};

export default TripDetailsHeader;
