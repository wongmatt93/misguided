import Card from "react-bootstrap/Card";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import City from "../../../models/City";
import { getCityById } from "../../../services/cityService";
import "./HometownCard.css";
import { useNavigate } from "react-router-dom";

const HometownCard = () => {
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hometown, setHometown] = useState<City | null>(null);

  useEffect(() => {
    if (userProfile && userProfile.hometownId) {
      getCityById(userProfile.hometownId).then((response) =>
        setHometown(response)
      );
    }
  }, [userProfile]);

  const handleClick = (hometown: City): void => {
    hometown._id && navigate(`/plan-trip/city-details/${hometown._id}`);
  };

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
