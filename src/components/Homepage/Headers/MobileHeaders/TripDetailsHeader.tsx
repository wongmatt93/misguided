import { useContext, useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import TripContext from "../../../../context/TripContext";
import { Participant } from "../../../../models/Trip";
import TripSettingsOffcanvas from "../../Offcanvases/TripSettings/TripSettingsOffcanvas";
import "./TripDetailsHeader.css";

interface Props {
  uid: string;
  refreshProfile: () => Promise<void>;
}

const TripDetailsHeader = ({ uid, refreshProfile }: Props) => {
  // variables
  const { trip, loading, refreshTrip } = useContext(TripContext);
  const [accepted, setAccepted] = useState(false);
  const [show, setShow] = useState(false);

  // functions
  const handleShow = (): void => setShow(true);
  const handleClose = (): void => setShow(false);

  useEffect(() => {
    if (trip) {
      const match: Participant | undefined = trip.participants.find(
        (participant) => participant.user.uid === uid
      );

      setAccepted(Boolean(match?.accepted));
    }
  }, [uid, trip]);

  return (
    <>
      {!loading &&
        (trip ? (
          <div className="TripDetailsHeader">
            <h1>
              {trip.nickname
                ? trip.nickname.toLowerCase()
                : trip.city.cityName.toLowerCase()}
            </h1>
            {accepted && (
              <button className="menu-button" onClick={handleShow}>
                <RiMenuLine />
              </button>
            )}
            <TripSettingsOffcanvas
              refreshProfile={refreshProfile}
              tripId={trip._id!}
              nickname={trip.nickname}
              refreshTrip={() => refreshTrip(trip._id!)}
              show={show}
              handleClose={handleClose}
            />
          </div>
        ) : (
          <h1>misguided</h1>
        ))}
    </>
  );
};

export default TripDetailsHeader;
