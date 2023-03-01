import Button from "react-bootstrap/Button";
import { FormEvent, useContext, useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import AuthContext from "../../../context/AuthContext";
import "./AccountInformationPage.css";
import { updateUserPhoto } from "../../../services/userService";

const AccountInformationPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(
        storage,
        `user-photos/${userProfile!.uid}/${file.name}`
      );
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateUserPhoto(userProfile!.uid, url).then(() =>
            refreshProfile(userProfile!.uid)
          );
        });
      });
    }
  };

  return (
    <>
      <header className="AccountHeader">
        <h1>settings / account</h1>
      </header>
      <main className="AccountMain">
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
      </main>
    </>
  );
};

export default AccountInformationPage;
