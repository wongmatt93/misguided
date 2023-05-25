import { FormEvent, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import "./UploadPhotosModal.css";
import Trip from "../../../models/Trip";
import { addPhotosToTrip } from "../../../services/tripServices";

interface Props {
  trip: Trip;
  show: boolean;
  handleClose: () => void;
  refreshProfile: () => Promise<void>;
}

const UploadPhotosModal = ({
  trip,
  show,
  handleClose,
  refreshProfile,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, `trip_photos/${trip._id!}/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addPhotosToTrip(trip!._id!, url).then(() => refreshProfile());
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
