import { FormEvent, useState } from "react";
import { RiCheckFill, RiCloseCircleFill, RiEditFill } from "react-icons/ri";
import { updatePhoneNumber } from "../../../../../services/userProfileServices";
import "./PhoneSettings.css";

interface Props {
  uid: string;
  userPhoneNumber: string;
  refreshProfile: () => Promise<void>;
}

const PhoneSettings = ({ uid, userPhoneNumber, refreshProfile }: Props) => {
  // variables
  const [phoneNumber, setPhoneNumber] = useState<string>(userPhoneNumber || "");
  const [locked, setLocked] = useState(true);

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await updatePhoneNumber(uid, phoneNumber);
    await refreshProfile();
    setLocked(true);
  };

  return (
    <div className="PhoneSettings">
      {locked ? (
        <div className="locked-settings">
          <div className="phone-container">
            <div className="label">phone number</div>
            <div>{userPhoneNumber || "n/a"}</div>
          </div>
          <button type="button">
            <RiEditFill onClick={() => setLocked(false)} />
          </button>
        </div>
      ) : (
        <form className="unlocked-settings" onSubmit={(e) => handleSubmit(e)}>
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
