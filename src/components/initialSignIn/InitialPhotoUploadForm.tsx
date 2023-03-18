import Button from "react-bootstrap/Button";
import { FormEvent, useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { updateUserPhoto } from "../../services/userService";
import "./InitialPhotoUploadForm.css";

interface Props {
  uid: string;
  refreshProfile: () => Promise<void>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const InitialPhotoUploadForm = ({ uid, refreshProfile, setStage }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, `user-photos/${uid}/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateUserPhoto(uid, url).then(() =>
            refreshProfile().then(() => setStage("hometown"))
          );
        });
      });
    }
  };

  return (
    <div className="InitiaPlhotoUploadForm">
      <p>Please upload a profile picture</p>
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
    </div>
  );
};

export default InitialPhotoUploadForm;
