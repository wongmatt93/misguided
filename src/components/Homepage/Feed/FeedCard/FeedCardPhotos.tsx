import { Carousel } from "react-bootstrap";
import "./FeedCardPhotos.css";

interface Props {
  photos: string[];
}

const FeedCardPhotos = ({ photos }: Props) => {
  return (
    <Carousel
      className="FeedCardPhotos"
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
    </Carousel>
  );
};

export default FeedCardPhotos;
