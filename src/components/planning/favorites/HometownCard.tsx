import Card from "react-bootstrap/Card";
import City from "../../../models/City";
import "./HometownCard.css";
import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../../hooks/useCityFetcher";

interface Props {
  hometownId: string;
}

const HometownCard = ({ hometownId }: Props) => {
  const navigate = useNavigate();
  const hometown: City | null = useCityFetcher(hometownId);

  const handleClick = (hometown: City): void =>
    navigate(`/plan-trip/city-details/${hometown._id}`);

  return (
    <li className="HometownCard">
      <h3>Your Hometown</h3>
      {hometown && (
        <Card onClick={() => handleClick(hometown)}>
          <Card.Img variant="top" src={hometown.photoURL}></Card.Img>
          <Card.Body>
            <Card.Title>{hometown.cityName}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </li>
  );
};

export default HometownCard;
