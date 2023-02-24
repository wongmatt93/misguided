import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./FriendCardPhotoCarousel.css";

interface Props {
  photos: string[];
  handleViewTrip: () => void;
}

const FriendCardPhotoCarousel = ({ photos, handleViewTrip }: Props) => {
  const [moreThanFive, setMoreThanFive] = useState(false);

  useEffect(() => {
    if (photos.length === 6) {
      photos.pop();
      setMoreThanFive(true);
    }
  }, [photos]);

  return (
    <Carousel
      className="FriendCardPhotoCarousel"
      interval={null}
      wrap={false}
      indicators={false}
      variant="dark"
    >
      {photos.map((photo, index) => (
        <Carousel.Item key={index}>
          <img className="carousel-image" src={photo} alt={photo} />
        </Carousel.Item>
      ))}
      {moreThanFive && (
        <Carousel.Item>
          <div className="decoy" onClick={handleViewTrip}>
            <Carousel.Caption>
              <h5>Click here to view more photos</h5>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default FriendCardPhotoCarousel;
