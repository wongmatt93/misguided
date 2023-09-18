import { FormEvent, useRef } from "react";
import { Modal, Button } from "react-bootstrap/";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";

import "./UploadPhotosModal.css";
import { addPhotosToTrip } from "../../../../services/tripServices";

interface Props {
  tripId: string;
  refreshTrip: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const UploadPhotosModal = ({
  tripId,
  refreshTrip,
  show,
  handleClose,
}: Props) => {
  // variables
  const fileInputRef = useRef<HTMLInputElement>(null);

  // functions
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, `trip_photos/${tripId}/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addPhotosToTrip(tripId, url).then(() => refreshTrip());
        });
      });
    }

    handleClose();
  };

  return (
    <Modal className="UploadPhotosModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Photos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input ref={fileInputRef} type="file" />
          <Button
            variant="warning"
            type="submit"
            className="upload-photos-button"
          >
            Upload
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadPhotosModal;
