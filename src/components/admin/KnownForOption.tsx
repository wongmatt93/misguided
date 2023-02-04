import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./KnownForOption.css";

interface Props {
  option: string;
  knownFor: string[];
  setKnownFor: React.Dispatch<React.SetStateAction<string[]>>;
}

const KnownForOption = ({ option, knownFor, setKnownFor }: Props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      // adds task id to array when checked
      setKnownFor((prev) => {
        return [...prev, option];
      });
    } else {
      // finds index number for checked item
      const index: number = knownFor.findIndex((item) => item === option);

      // removes checked item from array when box is unchecked
      if (index !== -1) {
        setKnownFor((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <Form.Check
      inline
      className="KnownForOption"
      id={option}
      label={option}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export default KnownForOption;
