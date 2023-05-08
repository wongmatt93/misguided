import { RiEditFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import FullTrip, { Participant } from "../../../models/Trip";
import EditNicknameModal from "./EditNicknameModal";
import "./TripDetailsHeader.css";
import { getFullTripById } from "../../../services/tripServices";
import AuthContext from "../../../context/AuthContext";

interface Props {
  path: string;
}

const TripDetailsHeader = ({ path }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [trip, setTrip] = useState<FullTrip | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const refreshTrip = async (tripId: string): Promise<void> => {
    await Promise.allSettled([
      setTrip(await getFullTripById(tripId)),
      refreshProfile(),
    ]);
  };

  useEffect(() => {
    if (path.includes("trip-details/")) {
      getFullTripById(path.split("trip-details/")[1]).then((response) =>
        setTrip(response)
      );
    }
  }, [path]);

  useEffect(() => {
    if (userProfile && trip) {
      const match: Participant | undefined = trip.participants.find(
        (participant) => participant.uid === userProfile.uid
      );

      match && setAccepted(match.accepted);
    }
  }, [trip, userProfile]);

  const handleShow = (): void => setShowModal(true);
  const handleClose = (): void => setShowModal(false);

  return (
    <>
      {trip && (
        <div className="TripDetailsHeader MobileHeaderDiv">
          <div
            className="name-container"
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
          >
            <h1>
              {trip.nickname
                ? trip.nickname.toLowerCase()
                : trip.city.cityName.toLowerCase()}
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
        </div>
      )}
    </>
  );
};

export default TripDetailsHeader;
