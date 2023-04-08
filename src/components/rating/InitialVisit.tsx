import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Rating } from "../../models/City";
import { addRating } from "../../services/cityService";
import "./InitialVisit.css";
import SubmissionModal from "./SubmissionModal";

const InitialVisit = () => {
  const { userProfile } = useContext(AuthContext);
  const cityId: string | undefined = useParams().cityId;
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const totalStars = 5;

  const [show, setShow] = useState(false);

  const handleClose = (): void => {
    setShow(false);
    navigate("/home");
  };
  const handleShow = (): void => setShow(true);

  const handleSubmit = async (cityId: string): Promise<void> => {
    const newRating: Rating = {
      uid: userProfile!.uid,
      rating,
    };

    await addRating(cityId, newRating);
    handleShow();
  };

  return (
    <section className="InitialVisit">
      <h2>It looks like this was your first visit</h2>
      <div className="stars-container">
        {[...new Array(totalStars)].map((star, index) =>
          index < rating ? (
            <div key={index}>
              <RiStarFill onClick={() => setRating(index + 1)} />
            </div>
          ) : (
            <div key={index}>
              <RiStarLine onClick={() => setRating(index + 1)} />
            </div>
          )
        )}
      </div>
      {cityId && (
        <Button
          variant="warning"
          disabled={rating > 0 ? false : true}
          onClick={() => handleSubmit(cityId)}
        >
          Submit
        </Button>
      )}
      <SubmissionModal show={show} handleClose={handleClose} />
    </section>
  );
};

export default InitialVisit;
