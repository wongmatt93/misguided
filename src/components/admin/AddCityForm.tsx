import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addNewCity } from "../../services/cityService";
import "./AddCityForm.css";
import KnownForOption from "./KnownForOption";

const AddCityForm = () => {
  const [cityName, setCityName] = useState("");
  const [cityDescription, setCityDescription] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [country, setCountry] = useState("");
  const [knownFor, setKnownFor] = useState<string[]>([]);
  const [photoURL, setPhotoURL] = useState("");

  const knownForOptions: string[] = [
    "Charming",
    "Foodie",
    "Nightlife",
    "Architecture",
    "History",
    "Museums",
    "Performing Arts",
    "Music",
    "Hipster",
    "Hippie",
    "Posh",
    "Family Friendly",
    "LGBT Scene",
    "Diversity",
    "Beach Town",
    "College Town",
    "Ski Town",
    "Outdoorsy",
    "Wineries",
    "Shopping",
  ];

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    addNewCity({
      cityName,
      cityDescription,
      cityCode,
      latitude,
      longitude,
      country,
      knownFor,
      photoURL,
      ratings: [],
    });
  };

  return (
    <Form className="AddCityForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>City Name</Form.Label>
        <Form.Control
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>City Description</Form.Label>
        <Form.Control
          value={cityDescription}
          onChange={(e) => setCityDescription(e.target.value)}
          as="textarea"
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>City Code</Form.Label>
        <Form.Control
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Known For</Form.Label>
        {knownForOptions.map((option) => (
          <KnownForOption
            key={option}
            option={option}
            knownFor={knownFor}
            setKnownFor={setKnownFor}
          />
        ))}
      </Form.Group>
      <Form.Group>
        <Form.Label>Photo URL</Form.Label>
        <Form.Control
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add City
      </Button>
    </Form>
  );
};

export default AddCityForm;
