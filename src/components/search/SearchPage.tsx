import { Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import UserProfile from "../../models/UserProfile";
import { getUserByUsername } from "../../services/userService";
import "./SearchPage.css";
import UserCard from "./UserCard";

const SearchPage = () => {
  const [username, setUsername] = useState("");
  const [searchProfile, setSearchProfile] = useState<UserProfile | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    getUserByUsername(username).then((response) => setSearchProfile(response));
  };

  return (
    <main className="SearchPage">
      <h2>Search Users</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Control
            type="text"
            placeholder="Search usernames"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="warning" type="submit" className="search-button">
          Search
        </Button>
      </Form>
      {searchProfile && <UserCard searchProfile={searchProfile} />}
    </main>
  );
};

export default SearchPage;
