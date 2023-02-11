import { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Trip, { Comment, Like } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import {
  commentOnTrip,
  likeTrip,
  unlikeTrip,
} from "../../../services/tripServices";
import { getUserByUid } from "../../../services/userService";
import "./FeedCard.css";
import PlaceholderCard from "./PlaceholderCard";

interface Props {
  trip: Trip;
}

const FeedCard = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [creator, setCreator] = useState<UserProfile | null>(null);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesQuantity, setLikesQuantity] = useState(0);
  const [commentsQuantity, setCommentsQuantity] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getUserByUid(trip.creatorUid).then((response) => setCreator(response));

    trip.photos.length > 0
      ? setPhotos(trip.photos)
      : setPhotos([trip.cityPhoto]);

    trip.likes.some((item) => item.uid === userProfile!.uid)
      ? setLiked(true)
      : setLiked(false);

    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
    setLikesQuantity(trip.likes.length);
    setCommentsQuantity(trip.comments.length);
    setFullyLoaded(true);
  }, [userProfile, trip]);

  const handleViewProfile = (): void => navigate(`/profile/${creator!.uid}`);

  const handleViewTrip = (): void => navigate(`/trip/${trip._id!}`);

  const handleLikeTrip = (): Promise<Like | void> =>
    likeTrip(trip._id!, { uid: userProfile!.uid }).then(() =>
      refreshProfile(userProfile!.uid)
    );

  const handleUnlikeTrip = (): Promise<void> =>
    unlikeTrip(trip._id!, userProfile!.uid).then(() =>
      refreshProfile(userProfile!.uid)
    );

  const handleSubmitComment = (e: FormEvent): void => {
    e.preventDefault();

    const newComment: Comment = {
      uid: userProfile!.uid,
      comment,
      date: Date.now().toString(),
    };

    commentOnTrip(trip._id!, newComment).then(() =>
      refreshProfile(userProfile!.uid)
    );

    setComment("");
  };

  return (
    <li className="FeedCard">
      {fullyLoaded && creator ? (
        <div className="post">
          <div className="post-header">
            <div className="image-name-location-container">
              <img
                src={creator.photoURL!}
                alt={creator.photoURL!}
                onClick={handleViewProfile}
              />
              <div className="name-location-container">
                <h3 onClick={handleViewProfile}>{creator.displayName}</h3>
                <div className="city-container">
                  <h4>{trip.cityName}</h4>
                  <p>
                    {startDate!.toLocaleDateString()} -{" "}
                    {endDate!.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="warning" onClick={handleViewTrip}>
              View Trip
            </Button>
          </div>
          <div className="image-container">
            {photos.map((photo) => (
              <img key={photo} src={photo} alt={photo} />
            ))}
          </div>
          <div className="likes-comments-labels">
            <p>{likesQuantity} likes</p>
            <p>{commentsQuantity} comments</p>
          </div>
          <div className="likes-comments-buttons">
            {liked ? (
              <div onClick={handleUnlikeTrip}>
                <AiFillHeart />
                <p>Like</p>
              </div>
            ) : (
              <div onClick={handleLikeTrip}>
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                <p>Like</p>
              </div>
            )}
            <div onClick={() => setOpenComment(!openComment)}>
              <AiOutlineMessage />
              <p>Comment</p>
            </div>
          </div>
          <Collapse in={openComment}>
            <div className="comment-form">
              <Form onSubmit={handleSubmitComment}>
                <Form.Group controlId="comment">
                  <Form.Control
                    placeholder="Enter Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="warning">
                  Comment
                </Button>
              </Form>
            </div>
          </Collapse>
        </div>
      ) : (
        <PlaceholderCard />
      )}
    </li>
  );
};

export default FeedCard;
