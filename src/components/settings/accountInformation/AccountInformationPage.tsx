import { ListGroup } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import "./AccountInformationPage.css";
import UpdatePhoto from "./UpdatePhoto";

const AccountInformationPage = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <>
      <header className="AccountHeader">
        <h1>settings / account</h1>
      </header>
      {userProfile && (
        <main className="AccountMain">
          <UpdatePhoto userProfile={userProfile} />
          <h2 className="username">{userProfile.username}</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>name</ListGroup.Item>
            <ListGroup.Item>email</ListGroup.Item>
            <ListGroup.Item>phone</ListGroup.Item>
            <ListGroup.Item>hometown</ListGroup.Item>
          </ListGroup>
        </main>
      )}
    </>
  );
};

export default AccountInformationPage;
