import { useContext, useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import TripContext from "../../../../context/TripContext";
import { Participant } from "../../../../models/Trip";
import "./TripDetailsHeader.css";

interface Props {
  uid: string;
}

const TripDetailsHeader = ({ uid }: Props) => {
  // variables
  const { trip, loading } = useContext(TripContext);
  const [accepted, setAccepted] = useState(false);

  // functions
  useEffect(() => {
    if (trip) {
      const match: Participant | undefined = trip.participants.find(
        (participant) => participant.user.uid === uid
      );

      match && setAccepted(match.accepted);
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
              <button className="menu-button">
                <RiMenuLine />
              </button>
            )}
          </div>
        ) : (
          <h1>misguided</h1>
        ))}
    </>
  );
};

export default TripDetailsHeader;
