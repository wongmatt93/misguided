import { RiStarLine, RiStarFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./SubsequentVisit.css";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getCityById, updateRating } from "../../services/cityService";
import { Rating } from "../../models/City";
import SubmissionModal from "./SubmissionModal";

const SubsequentVisit = () => {
  const { userProfile } = useContext(AuthContext);
  const cityId: string | undefined = useParams().cityId;
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userProfile && cityId) {
      getCityById(cityId).then((response) => {
        const match: Rating | undefined = response.ratings.find(
          (rating) => rating.uid === userProfile.uid
        );

        match && setRating(match.rating);
      });
    }
  }, [userProfile, cityId]);

  const handleClose = (): void => {
    setShow(false);
    navigate("/home");
  };
  const handleShow = (): void => setShow(true);

  const handleSubmit = async (cityId: string): Promise<void> => {
    await updateRating(cityId, userProfile!.uid, rating.toString());
    handleShow();
  };

  const handleCancel = (): void => navigate("/home");

  return (
    <section className="SubsequentVisit">
      <h2>It looks like you've been here before.</h2>
      <p>Would you like to update your rating?</p>
      <div className="stars-container">
        {[0, 1, 2, 3, 4].map((star) =>
          star < rating ? (
            <div key={star}>
              <RiStarFill onClick={() => setRating(star + 1)} />
            </div>
          ) : (
            <div key={star}>
              <RiStarLine onClick={() => setRating(star + 1)} />
            </div>
          )
        )}
      </div>
      {cityId && (
        <div className="button-container">
          <Button variant="warning" onClick={handleCancel}>
            Home
          </Button>
          <Button variant="warning" onClick={() => handleSubmit(cityId)}>
            Submit
          </Button>
        </div>
      )}
      <SubmissionModal show={show} handleClose={handleClose} />
    </section>
  );
};

export default SubsequentVisit;
