import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap/";
import { addCommentToTrip } from "../../../../services/tripServices";
import "./AddCommentForm.css";

interface Props {
  uid: string;
  tripId: string;
  refreshFeedTrips: () => Promise<void>;
}

const AddCommentForm = ({ uid, tripId, refreshFeedTrips }: Props) => {
  // variables
  const [comment, setComment] = useState("");

  // functions
  const handleSubmitComment = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await addCommentToTrip(tripId, uid, comment);
    await refreshFeedTrips();

    setComment("");
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
