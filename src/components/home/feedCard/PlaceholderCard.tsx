import Placeholder from "react-bootstrap/Placeholder";
import { AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import "./PlaceholderCard.css";

const PlaceholderCard = () => {
  return (
    <div className="PlaceholderCard">
      <Placeholder as="div" animation="glow" className="post-header">
        <div className="image-name-location-container">
          <Placeholder as="div" className="user-photo" />
          <div className="name-location-container">
            <Placeholder as="div" className="title" />
            <div className="city-container">
              <Placeholder as="div" className="city" />
            </div>
          </div>
        </div>
        <Placeholder.Button variant="warning" />
      </Placeholder>
      <Placeholder as="div" className="image-container" animation="glow">
        <Placeholder as="div" className="image" />
      </Placeholder>
      <Placeholder as="div" className="participants" animation="glow">
        <Placeholder xs={3} />
      </Placeholder>
      <Placeholder as="div" className="likes-comments-labels" animation="glow">
        <Placeholder xs={3} />
        <Placeholder xs={3} />
      </Placeholder>
      <div className="likes-comments-buttons">
        <div>
          <AiFillHeart />
          <p>Like</p>
        </div>
        <div>
          <AiOutlineMessage />
          <p>Comment</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCard;
