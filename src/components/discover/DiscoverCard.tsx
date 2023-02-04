import { MdLocationPin } from "react-icons/md";
import Card from "react-bootstrap/Card";
import City from "../../models/City";
import "./DiscoverCard.css";
import { useNavigate } from "react-router-dom";

interface Props {
  currentCity: City;
  cityRating: number;
}

const DiscoverCard = ({ currentCity, cityRating }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/city-details/${currentCity!._id}`);
  };

  return (
    <Card className="DiscoverCard" onClick={handleClick} bg="light">
      <Card.Img variant="top" src={currentCity.photoURL}></Card.Img>
      <Card.Body>
        <div>
          <Card.Title>{currentCity.cityName}</Card.Title>
          <div className="country">
            <MdLocationPin className="pin" />
            <Card.Text>{currentCity.country}</Card.Text>
          </div>
        </div>
        <Card.Text>{cityRating ? cityRating : "No Ratings Yet"}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DiscoverCard;
