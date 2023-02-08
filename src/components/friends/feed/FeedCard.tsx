import { useEffect, useState } from "react";
import Trip from "../../../models/Trip";
import { getUserByUid } from "../../../services/userService";
import "./FeedCard.css";

interface Props {
  trip: Trip;
}

const FeedCard = ({ trip }: Props) => {
  const [creatorName, setCreatorName] = useState("");
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    getUserByUid(trip.creatorUid).then((response) => {
      setCreatorName(response.displayName!);
      setFullyLoaded(true);
      setStartDate(new Date(trip.date1));
      setEndDate(new Date(trip.date2));
    });

    if (trip.photos.length > 0) {
      setPhotos(trip.photos);
    } else {
      setPhotos([trip.cityPhoto]);
    }
  }, [trip]);

  return (
    <li className="FeedCard">
      {fullyLoaded && (
        <div className="post">
          <h3>{creatorName}</h3>
          <div className="image-container">
            {photos.map((photo) => (
              <img key={photo} src={photo} alt={photo} />
            ))}
          </div>
          <div className="info-container">
            <h4>{trip.cityName}</h4>
            <p>
              {startDate!.toLocaleDateString()} -{" "}
              {endDate!.toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};

export default FeedCard;
