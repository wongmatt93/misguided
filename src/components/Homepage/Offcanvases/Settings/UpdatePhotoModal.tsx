import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { storage } from "../../../../firebaseConfig";
import { updateProfilePhoto } from "../../../../services/userProfileServices";
import "./UpdatePhotoModal.css";

interface Props {
  uid: string;
  refreshProfile: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const UpdatePhotoModal = ({
  uid,
  refreshProfile,
  show,
  handleClose,
}: Props) => {
  // variables
  const fileInputRef = useRef<HTMLInputElement>(null);

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need

      const storageRef = ref(storage, `user-photos/${uid}/${file.name}`);

      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      await updateProfilePhoto(uid, photoURL);
      await refreshProfile();

      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="UpdatePhotoModal">
      <Modal.Header>
        <Modal.Title>Upload New Profile Picture</Modal.Title>
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
      <Modal.Footer>
        <Button variant="warning" type="button" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePhotoModal;
