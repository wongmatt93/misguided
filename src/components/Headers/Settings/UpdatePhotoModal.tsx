import { Modal, Button } from "react-bootstrap";
import { FormEvent, useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { updateUserProfile } from "../../../services/userService";
import "./UpdatePhotoModal.css";
import ActiveUserProfile, { UserProfile } from "../../../models/UserProfile";
import { formatUserProfileToSave } from "../../../utils/userFunctions";

interface Props {
  show: boolean;
  handleClose: () => void;
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
}

const UpdatePhotoModal = ({
  show,
  handleClose,
  userProfile,
  refreshProfile,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need

      const storageRef = ref(
        storage,
        `user-photos/${userProfile.uid}/${file.name}`
      );

      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      const formattedProfile: UserProfile =
        formatUserProfileToSave(userProfile);
      await updateUserProfile({
        ...formattedProfile,
        photoURL,
      });
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
