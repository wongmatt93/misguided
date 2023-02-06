import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { CityVote } from "../../models/UserProfile";
import "./LikedCard.css";

interface Props {
  liked: CityVote;
}

const LikedCard = ({ liked }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/city-details/${liked!.cityId}`);
  };

  return (
    <li className="LikedCard">
      <Card onClick={handleClick}>
        <Card.Img variant="top" src={liked.photo}></Card.Img>
        <Card.Body>
          <Card.Title>{liked.cityName}</Card.Title>
        </Card.Body>
      </Card>
    </li>
  );
};

export default LikedCard;
