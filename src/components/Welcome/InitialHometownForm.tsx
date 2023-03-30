import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useFetchAllCities from "../../hooks/useFetchAllCities";
import City from "../../models/City";
import { updateUserHometown } from "../../services/userService";
import "./InitialHometownForm.css";

interface Props {
  uid: string;
  refreshProfile: () => Promise<void>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const InitialHometownForm = ({ uid, refreshProfile, setStage }: Props) => {
  const cities: City[] = useFetchAllCities();
  const [hometownId, setHometownId] = useState("");

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await updateUserHometown(uid, hometownId);
    await refreshProfile();
    setStage("preferences");
  };

  return (
    <Form className="InitialHometownForm" onSubmit={handleSubmit}>
      <Form.Label>Choose your hometown</Form.Label>
      <Form.Group>
        <Form.Select
          value={hometownId}
          onChange={(e) => setHometownId(e.target.value)}
        >
          <option disabled value="">
            -- Select Your Hometown --
          </option>
          {cities.sort().map((city) => (
            <option key={city.cityCode} value={city._id!}>
              {city.cityName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button
        variant="warning"
        type="submit"
        disabled={hometownId ? false : true}
      >
        Next
      </Button>
    </Form>
  );
};

export default InitialHometownForm;
