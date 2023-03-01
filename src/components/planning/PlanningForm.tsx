import Button from "react-bootstrap/Button";
import { DateRange, Range } from "react-date-range";
import "./PlanningForm.css";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSubmit: (e: FormEvent) => void;
}

const PlanningForm = ({ setStartDate, setEndDate, handleSubmit }: Props) => {
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    dates[0].startDate && setStartDate(dates[0].startDate.getTime().toString());
    dates[0].endDate && setEndDate(dates[0].endDate.getTime().toString());
  }, [dates, setStartDate, setEndDate]);

  return (
    <div className="PlanningForm">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDates([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dates}
      />
      <Button
        variant="warning"
        type="submit"
        className="generate-button"
        onClick={handleSubmit}
      >
        Generate Itinerary
      </Button>
    </div>
  );
};

export default PlanningForm;
