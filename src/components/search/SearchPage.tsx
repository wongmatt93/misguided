import { Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import UserProfile from "../../models/UserProfile";
import { getUserByEmail } from "../../services/userService";
import "./SearchPage.css";
import UserCard from "./UserCard";

const SearchPage = () => {
  const [emailSearch, setEmailSearch] = useState("");
  const [searchProfile, setSearchProfile] = useState<UserProfile | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    getUserByEmail(emailSearch).then((response) => setSearchProfile(response));
  };

  return (
    <main className="SearchPage">
      <h2>Search Users</h2>
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
    </main>
  );
};

export default SearchPage;
