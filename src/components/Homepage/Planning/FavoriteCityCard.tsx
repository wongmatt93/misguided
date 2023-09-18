import Card from "react-bootstrap/Card";

import City from "../../../models/City";
import "./FavoriteCityCard.css";

interface Props {
  city: City;
  handleShow: () => void;
}

const FavoriteCityCard = ({ city, handleShow }: Props) => {
  // variables
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${city.photoURL}`;

  return (
    <li className="FavoriteCityCard" onClick={() => handleShow()}>
      <Card>
        <Card.Img variant="top" src={imagePath} alt={city.cityName}></Card.Img>
        <Card.Body>
          <Card.Title>{city.cityName}</Card.Title>
        </Card.Body>
      </Card>
    </li>
  );
};

export default FavoriteCityCard;
