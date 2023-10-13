import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import CityContext from "../../../../../context/CityContext";
import { Rating } from "../../../../../models/City";
import { addRating, updateRating } from "../../../../../services/cityServices";
import "./RatingForm.css";

interface Props {
  uid: string;
  cityId: string;
  ratings: Rating[];
  show: boolean;
  closeItineraryModal: () => void;
}

const RatingForm = ({
  uid,
  cityId,
  ratings,
  show,
  closeItineraryModal,
}: Props) => {
  // variables
  const { refreshCities } = useContext(CityContext);
  const currentRating: Rating | undefined = ratings.find(
    (rating) => rating.uid === uid
  );
  const [rating, setRating] = useState<number>(currentRating?.rating || 0);

  // functions
  const handleSubmit = async () => {
    const newRating: Rating = {
      uid,
      rating,
    };

    if (currentRating) {
      await updateRating(cityId, uid, String(rating));
    } else {
      await addRating(cityId, newRating);
    }

    await refreshCities();
    closeItineraryModal();
  };

  return (
    <Modal className="RatingForm" show={show} onHide={closeItineraryModal}>
      <Modal.Header closeButton>
        <h2>{currentRating ? "Update your rating" : "Add your rating"}</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="stars-container">
          {[...new Array(5)].map((_, index) =>
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
        <Button
          className="rating-button"
          variant="warning"
          disabled={currentRating?.rating === rating || rating === 0}
          onClick={handleSubmit}
        >
          {currentRating ? "Update" : "Submit"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RatingForm;
