import { RiEditFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import Trip from "../../../models/Trip";
import { UserTrip } from "../../../models/UserProfile";
import EditNicknameModal from "./EditNicknameModal";
import "./TripDetailsHeader.css";
import { getCityById } from "../../../services/cityService";
import { getTripById } from "../../../services/tripServices";
import AuthContext from "../../../context/AuthContext";

interface Props {
  path: string;
}

const TripDetailsHeader = ({ path }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [cityName, setCityName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const refreshTrip = async (tripId: string): Promise<void> => {
    await Promise.allSettled([
      setTrip(await getTripById(tripId)),
      refreshProfile(),
    ]);
  };

  useEffect(() => {
    if (path.includes("trip-details")) {
      getTripById(path.slice(14)).then((response) => setTrip(response));
    }
  }, [path]);

  useEffect(() => {
    trip &&
      getCityById(trip.cityId).then((response) =>
        setCityName(response.cityName)
      );
  }, [trip]);

  useEffect(() => {
    if (userProfile && trip) {
      const match: UserTrip | undefined = userProfile.trips.find(
        (userTrip) => userTrip.tripId === trip._id!
      );

      match && setAccepted(match.accepted);
    }
  }, [trip, userProfile]);

  const handleShow = (): void => setShowModal(true);
  const handleClose = (): void => setShowModal(false);

  return (
    <>
      {trip && (
        <header className="TripDetailsHeader">
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
      )}
    </>
  );
};

export default TripDetailsHeader;
