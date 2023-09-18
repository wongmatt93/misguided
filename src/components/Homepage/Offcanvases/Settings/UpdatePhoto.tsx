import { useState } from "react";
import { RiImageEditFill } from "react-icons/ri";
import "./UpdatePhoto.css";
import UpdatePhotoModal from "./UpdatePhotoModal";

interface Props {
  uid: string;
  photoURL: string;
  refreshProfile: () => Promise<void>;
}

const UpdatePhoto = ({ uid, photoURL, refreshProfile }: Props) => {
  // variables
  const [show, setShow] = useState(false);

  // functions
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <div className="UpdatePhoto">
      <img src={photoURL} alt="profile-pic" className="circle-image" />
      <div className="edit-photo" onClick={handleShow}>
        <RiImageEditFill />
      </div>
      <UpdatePhotoModal
        uid={uid}
        refreshProfile={refreshProfile}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default UpdatePhoto;
