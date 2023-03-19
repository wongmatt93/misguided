import UserProfile from "../../../models/UserProfile";
import SearchResultCard from "./SearchResultCard";
import "./SearchResultsContainer.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  searchResults: UserProfile[];
}

const SearchResultsContainer = ({
  userProfile,
  refreshProfile,
  searchResults,
}: Props) => {
  return (
    <ul className="SearchResultsContainer">
      {searchResults.map((result) => (
        <SearchResultCard
          key={result.uid}
          userProfile={userProfile}
          refreshProfile={refreshProfile}
          user={result}
        />
      ))}
    </ul>
  );
};

export default SearchResultsContainer;
