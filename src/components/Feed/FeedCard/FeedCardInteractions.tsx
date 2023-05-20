import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { useState } from "react";
import FullTrip from "../../../models/Trip";
import "./FeedCardInteractions.css";
import TripCommentsOffcanvas from "../../TripCommentsSection/TripCommentsOffcanvas";
import { addLikesUid, removeLikesUid } from "../../../services/tripServices";

interface Props {
  trip: FullTrip;
  uid: string;
  refreshTrip: () => Promise<void>;
}

const FeedCardInteractions = ({ trip, uid, refreshTrip }: Props) => {
  const [show, setShow] = useState(false);

  const { _id, likesUids, comments } = trip;

  const liked: boolean = likesUids.some((likesUid) => likesUid === uid);

  const handleLikeTrip = (): Promise<string | void> =>
    addLikesUid(_id!, uid).then(() => refreshTrip());

  const handleUnlikeTrip = (): Promise<void> =>
    removeLikesUid(_id!, uid).then(() => refreshTrip());

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <div className="FeedCardInteractions">
      <div className="likes">
        {liked ? (
          <AiFillHeart onClick={handleUnlikeTrip} />
        ) : (
          <AiOutlineHeart onClick={handleLikeTrip} />
        )}
        <p>{likesUids.length}</p>
      </div>
      <div className="comments">
        <AiOutlineMessage onClick={handleShow} />
        <p>{comments.length}</p>
      </div>
      <TripCommentsOffcanvas
        trip={trip}
        refreshTrip={refreshTrip}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FeedCardInteractions;
