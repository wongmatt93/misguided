import { FormEvent, useContext, useState } from "react";
import { RiCheckFill, RiCloseCircleFill, RiEditFill } from "react-icons/ri";
import AuthContext from "../../../context/AuthContext";
import UserProfile from "../../../models/UserProfile";
import { updateUserPhone } from "../../../services/userService";
import "./PhoneSettings.css";

interface Props {
  userProfile: UserProfile;
}

const PhoneSettings = ({ userProfile }: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(
    userProfile.phoneNumber
  );
  const [locked, setLocked] = useState(true);

  const handleSubmit = async (
    e: FormEvent,
    phoneNumber: string
  ): Promise<void> => {
    e.preventDefault();
    await updateUserPhone(userProfile.uid, phoneNumber);
    await refreshProfile(userProfile.uid);
    setLocked(true);
  };

  return (
    <div className="PhoneSettings">
      {locked ? (
        <div className="locked-settings">
          <div className="phone-container">
            <div className="label">phone number</div>
            <div>
              {userProfile.phoneNumber ? userProfile.phoneNumber : "n/a"}
            </div>
          </div>
          <button type="button">
            <RiEditFill onClick={() => setLocked(false)} />
          </button>
        </div>
      ) : (
        <form
          className="unlocked-settings"
          onSubmit={(e) => handleSubmit(e, phoneNumber!)}
        >
          <div className="name-container">
            <div className="label">phone number</div>
            <input
              type="tel"
              value={phoneNumber !== null ? phoneNumber : "n/a"}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="check-button" type="submit">
              <RiCheckFill />
            </button>
            <button type="button" onClick={() => setLocked(true)}>
              <RiCloseCircleFill />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PhoneSettings;
