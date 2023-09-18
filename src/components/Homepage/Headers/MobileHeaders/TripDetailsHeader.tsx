import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { Participant, Trip } from "../../../../models/Trip";
import { getFullTripById } from "../../../../services/tripServices";
import "./TripDetailsHeader.css";

interface Props {
  uid: string;
  path: string;
}

const TripDetailsHeader = ({ uid, path }: Props) => {
  // variables
  const [trip, setTrip] = useState<Trip | null>(null);
  const [accepted, setAccepted] = useState(false);

  // functions
  useEffect(() => {
    if (path.includes("trip-details/")) {
      getFullTripById(path.split("trip-details/")[1]).then((response) => {
        setTrip(response);

        const match: Participant | undefined = response.participants.find(
          (participant) => participant.user.uid === uid
        );

        match && setAccepted(match.accepted);
      });
    }
  }, [uid, path]);

  return (
    <>
      {trip && (
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
      )}
    </>
  );
};

export default TripDetailsHeader;
