import { FormEvent, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap/";
import AuthContext from "../../context/AuthContext";
import Trip, { Comment } from "../../models/Trip";
import { commentOnTrip } from "../../services/tripServices";
import "./AddCommentForm.css";

interface Props {
  trip: Trip;
}

const AddCommentForm = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [comment, setComment] = useState("");

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
    <Form className="AddCommentForm" onSubmit={handleSubmitComment}>
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
  );
};
export default AddCommentForm;
