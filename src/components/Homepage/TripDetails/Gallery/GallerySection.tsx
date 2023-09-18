import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Participant } from "../../../../models/Trip";
import "./GallerySection.css";
import PhotoContainer from "./PhotoContainer";
import UploadPhotosModal from "./UploadPhotosModal";

interface Props {
  uid: string;
  tripId: string;
  participants: Participant[];
  photos: string[];
  refreshTrip: () => Promise<void>;
}

const GallerySection = ({
  uid,
  tripId,
  participants,
  photos,
  refreshTrip,
}: Props) => {
  // variables
  const [participated, setParticipated] = useState(false);
  const [show, setShow] = useState(false);

  // functions
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    const match: Participant | undefined = participants.find(
      (participant) => participant.user.uid === uid
    );

    if (match) {
      setParticipated(true);
    }
  }, [uid, participants]);

  return (
    <section className="GallerySection">
      <div className="gallery-label-row">
        <h2>Gallery ({photos.length})</h2>
        {participated && (
          <Button variant="warning" onClick={handleShow}>
            Upload Photos
          </Button>
        )}
      </div>
      <PhotoContainer photos={photos} />
      <UploadPhotosModal
        tripId={tripId}
        refreshTrip={refreshTrip}
        show={show}
        handleClose={handleClose}
      />
    </section>
  );
};

export default GallerySection;
