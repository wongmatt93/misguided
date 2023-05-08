import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FullTrip from "../../../../models/Trip";
import ActiveUserProfile, { UserProfile } from "../../../../models/UserProfile";
import "./GallerySection.css";
import PhotoContainer from "./PhotoContainer";
import UploadPhotosModal from "./UploadPhotosModal";

interface Props {
  userProfile: ActiveUserProfile | undefined;
  refreshProfile: () => Promise<void>;
  trip: FullTrip;
  participants: UserProfile[];
}

const GallerySection = ({
  userProfile,
  refreshProfile,
  trip,
  participants,
}: Props) => {
  const [participated, setParticipated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    if (userProfile) {
      const match: UserProfile | undefined = participants.find(
        (participant) => participant.uid === userProfile!.uid
      );

      if (match) {
        setParticipated(true);
      }
    }
  }, [userProfile, participants]);

  return (
    <section className="GallerySection">
      <div className="gallery-label-row">
        <h4>Gallery ({trip.photos.length})</h4>
        {participated && (
          <Button variant="warning" onClick={handleShow}>
            Upload Photos
          </Button>
        )}
      </div>
      <PhotoContainer photos={trip.photos} />
      <UploadPhotosModal
        trip={trip}
        show={show}
        handleClose={handleClose}
        refreshProfile={refreshProfile}
      />
    </section>
  );
};

export default GallerySection;
