import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import City from "../../../models/City";
import { CityVote } from "../../../models/UserProfile";
import { getCityById } from "../../../services/cityService";
import "./FavoriteCard.css";

interface Props {
  liked: CityVote;
}

const FavoriteCard = ({ liked }: Props) => {
  const navigate = useNavigate();
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    getCityById(liked.cityId).then((response) => setCity(response));
  }, [liked]);

  const handleClick = (): void => {
    navigate(`/plan-trip/city-details/${liked!.cityId}`);
  };

  return (
    <li className="FavoriteCard">
      {city && (
        <Card onClick={handleClick}>
          <Card.Img variant="top" src={city.photoURL}></Card.Img>
          <Card.Body>
            <Card.Title>{city.cityName}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </li>
  );
};

export default FavoriteCard;
