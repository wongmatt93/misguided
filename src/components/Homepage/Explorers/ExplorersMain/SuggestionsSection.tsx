import { UserSummary } from "../../../../models/UserProfile";
import SuggestionCard from "./SuggestionCard";
import "./SuggestionsSection.css";

interface Props {
  uid: string;
  suggestions: UserSummary[];
  followers: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const SuggestionsSection = ({
  uid,
  suggestions,
  followers,
  refreshProfile,
}: Props) => {
  return (
    <section className="SuggestionsSection">
      <h2>Suggestions</h2>
      <ul>
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.uid}
            uid={uid}
            suggestion={suggestion}
            followers={followers}
            refreshProfile={refreshProfile}
          />
        ))}
      </ul>
    </section>
  );
};

export default SuggestionsSection;
