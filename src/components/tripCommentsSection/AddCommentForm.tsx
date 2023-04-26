import { FormEvent, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap/";
import AuthContext from "../../context/AuthContext";
import Trip, { Comment } from "../../models/Trip";
import { addCommentToTrip } from "../../services/tripServices";
import "./AddCommentForm.css";

interface Props {
  trip: Trip;
  refreshTrip: () => Promise<void>;
}

const AddCommentForm = ({ trip, refreshTrip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (userProfile) {
      const newComment: Comment = {
        uid: userProfile.uid,
        comment,
        date: Date.now().toString(),
      };

      await addCommentToTrip(trip._id!, newComment);
      await refreshTrip();
      await refreshProfile();

      setComment("");
    }
  };

  return (
    <Form className="AddCommentForm" onSubmit={handleSubmitComment}>
      <Form.Group controlId="comment">
        <Form.Control
          placeholder="add new comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="warning">
        Comment
      </Button>
    </Form>
  );
};
export default AddCommentForm;
