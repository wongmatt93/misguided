import { Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import UserProfile from "../../models/UserProfile";
import { getUserByUsername } from "../../services/userService";
import "./SearchPage.css";
import UserCard from "./UserCard";

interface Props {
  userProfile: UserProfile;
}

const SearchPage = ({ userProfile }: Props) => {
  const [username, setUsername] = useState("");
  const [searchProfile, setSearchProfile] = useState<UserProfile | null>(null);
  const [badSearch, setBadSearch] = useState(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await getUserByUsername(username).then((response) => {
      if (response) {
        setSearchProfile(response);
        setBadSearch(false);
      } else {
        setSearchProfile(null);
        setBadSearch(true);
      }
    });
  };

  return (
    <section className="SearchPage">
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
      {searchProfile && (
        <UserCard userProfile={userProfile} searchProfile={searchProfile} />
      )}
      {badSearch && (
        <div className="no-results">
          <p>No Results Found</p>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
