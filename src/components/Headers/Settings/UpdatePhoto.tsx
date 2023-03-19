import { useState } from "react";
import { RiImageEditFill } from "react-icons/ri";
import UserProfile from "../../../models/UserProfile";
import "./UpdatePhoto.css";
import UpdatePhotoModal from "./UpdatePhotoModal";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const UpdatePhoto = ({ userProfile, refreshProfile }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <div className="UpdatePhoto">
      <img
        src={userProfile.photoURL!}
        alt="profile-pic"
        className="circle-image"
      />
      <div className="edit-photo" onClick={handleShow}>
        <RiImageEditFill />
      </div>
      <UpdatePhotoModal
        show={show}
        handleClose={handleClose}
        uid={userProfile.uid}
        refreshProfile={refreshProfile}
      />
    </div>
  );
};

export default UpdatePhoto;
