import Card from "react-bootstrap/Card";
import UserProfile from "../../models/UserProfile";
import "./UserCard.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

interface Props {
  uid: string;
}

const UserCard = ({ uid }: Props) => {
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setUser(allUsers.find((user) => user.uid === uid));
  // }, [allUsers, uid]);

  const handleClick = (): void => {
    navigate(`/profile/${uid}`);
  };

  return (
    <li className="UserCard">
      <Card>
        <Card.Body onClick={handleClick}>
          <FaUserCircle />
          <Card.Title>{user && user.displayName}</Card.Title>
          <IoIosArrowForward />
        </Card.Body>
      </Card>
    </li>
  );
};

export default UserCard;
