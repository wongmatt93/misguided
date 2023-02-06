import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormEvent, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import UserCard from "./UserCard";
import "./SearchUsers.css";
import UserProfile from "../../models/UserProfile";
import { getUserByEmail } from "../../services/userService";

const SearchUsers = () => {
  const { userProfile } = useContext(AuthContext);
  const [emailSearch, setEmailSearch] = useState("");
  const [searchProfile, setSearchProfile] = useState<UserProfile | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    getUserByEmail(emailSearch).then((response) => setSearchProfile(response));
  };

  return (
    <div className="SearchUsers">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Search using E-mail"
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="warning" type="submit" className="search-button">
          Search
        </Button>
      </Form>
      {searchProfile && <UserCard searchProfile={searchProfile} />}
    </div>
  );
};

export default SearchUsers;
