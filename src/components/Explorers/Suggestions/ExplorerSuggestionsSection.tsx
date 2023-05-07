import ActiveUserProfile, { UserProfile } from "../../../models/UserProfile";
import ExplorerSuggestionCard from "./ExplorerSuggestionCard";
import "./ExplorerSuggestionsSection.css";

interface Props {
  suggestions: UserProfile[];
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
}

const ExplorerSuggestionsSection = ({
  suggestions,
  userProfile,
  refreshProfile,
}: Props) => {
  return (
    <section className="ExplorerSuggestionsSection">
      <h2>suggestions</h2>
      <ul>
        {suggestions.map((suggested) => (
          <ExplorerSuggestionCard
            key={suggested.uid}
            suggested={suggested}
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        ))}
      </ul>
    </section>
  );
};

export default ExplorerSuggestionsSection;
