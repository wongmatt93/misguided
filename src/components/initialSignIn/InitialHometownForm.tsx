import { FormEvent, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DiscoverContext from "../../context/DiscoverContext";
import UserProfile, { CityVote } from "../../models/UserProfile";
import { addLikedCity, updateUserHometown } from "../../services/userService";
import "./InitialHometownForm.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: (uid: string) => Promise<void>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const InitialHometownForm = ({
  userProfile,
  refreshProfile,
  setStage,
}: Props) => {
  const { cities } = useContext(DiscoverContext);
  const [hometownId, setHometownId] = useState(cities[0]._id!);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const newCity: CityVote = {
      cityId: hometownId,
    };

    updateUserHometown(userProfile.uid, hometownId)
      .then(() => addLikedCity(userProfile!.uid, newCity))
      .then(() => refreshProfile(userProfile!.uid))
      .then(() => setStage("preferences"));
  };

  return (
    <div className="InitialHometownForm">
      <h2>Select your hometown</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Select
            value={hometownId}
            onChange={(e) => setHometownId(e.target.value)}
          >
            {cities.sort().map((city) => (
              <option key={city.cityCode} value={city._id!}>
                {city.cityName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit">Next</Button>
      </Form>
    </div>
  );
};

export default InitialHometownForm;
