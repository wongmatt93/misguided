import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../../hooks/useCityFetcher";
import City from "../../../models/City";
import "./FavoriteCard.css";

interface Props {
  cityId: string;
}

const FavoriteCard = ({ cityId }: Props) => {
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(cityId);

  const handleClick = (): void => navigate(`/plan-trip/city-details/${cityId}`);

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
