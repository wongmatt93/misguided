import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./PlanningForm.css";
import { FormEvent } from "react";

interface Props {
  date1: string;
  date2: string;
  setDate1: React.Dispatch<React.SetStateAction<string>>;
  setDate2: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
}

const PlanningForm = ({
  date1,
  date2,
  setDate1,
  setDate2,
  handleSubmit,
}: Props) => {
  return (
    <Form className="PlanningForm" onSubmit={handleSubmit}>
      <Form.Group controlId="start-date" className="start-date">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="end-date" className="end-date">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={date2}
          onChange={(e) => setDate2(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Button variant="warning" type="submit" className="generate-button">
        Generate Itinerary
      </Button>
    </Form>
  );
};

export default PlanningForm;
