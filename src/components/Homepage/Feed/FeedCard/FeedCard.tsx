import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Trip } from "../../../../models/Trip";
import "./FeedCard.css";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardInteractions from "./FeedCardInteractions";
import FeedCardLocation from "./FeedCardLocation";
import FeedCardPhotos from "./FeedCardPhotos";

interface Props {
  uid: string;
  trip: Trip;
  refreshFeedTrips: () => Promise<void>;
}

const FeedCard = ({ uid, trip, refreshFeedTrips }: Props) => {
  // variables
  const {
    _id,
    city,
    nickname,
    participants,
    startDate,
    endDate,
    photos,
    likes,
    comments,
  } = trip;
  const [tripPhotos, setTripPhotos] = useState<string[]>([]);
  const navigate = useNavigate();
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${city.photoURL}`;

  // functions
  useEffect(() => {
    if (photos.length === 0) {
      setTripPhotos([imagePath]);
    } else {
      setTripPhotos(photos);
    }
  }, [photos, imagePath]);

  const handleViewTrip = (): void =>
    participants.some((participant) => participant.user.uid === uid)
      ? navigate(`/trips/trip-details/${_id}`)
      : navigate(`/feed/trip-details/${_id}`);

  return (
    <li className="FeedCard">
      <FeedCardHeader
        participants={participants}
        handleViewTrip={handleViewTrip}
      />
      <FeedCardLocation
        cityName={city.cityName}
        startDate={startDate}
        endDate={endDate}
      />
      <FeedCardPhotos photos={tripPhotos} />
      <FeedCardInteractions
        uid={uid}
        tripId={_id!}
        nickname={nickname}
        likes={likes}
        comments={comments}
        cityName={city.cityName}
        refreshFeedTrips={refreshFeedTrips}
      />
    </li>
  );
};

export default FeedCard;
