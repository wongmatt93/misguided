import { Button } from "react-bootstrap";

import "./FirstTimeUserView.css";

interface Props {
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setFirstTimeUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstTimeUserView = ({ stage, setStage, setFirstTimeUser }: Props) => {
  return (
    <div className="FirstTimeUserView">
      {!stage && (
        <div className="text-block animate__animated animate__fadeInDown animate__faster">
          <h2>You made it!</h2>
          <p>Let's give you a quick tour before we go.</p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setStage("feed")}
          >
            Continue
          </Button>
        </div>
      )}

      {stage === "feed" && (
        <div className="text-block animate__animated animate__fadeIn animate__faster">
          <p>
            This is the Feed page. Here, you'll see posts for all the explorers
            you follow
          </p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setStage("explorers")}
          >
            Continue
          </Button>
        </div>
      )}

      {stage === "explorers" && (
        <div className="text-block lower animate__animated animate__fadeIn animate__faster">
          <p>
            This is the Explorers page. Here, you'll see all of your friends.
            You'll also be able to search for new explorers to follow.
          </p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setStage("planning")}
          >
            Continue
          </Button>
        </div>
      )}

      {stage === "planning" && (
        <div className="text-block lower animate__animated animate__fadeIn animate__faster">
          <p>
            This is the Planning page. Here, you'll be able to plan a trip. You
            can begin planning trips right here in your hometown. However, you
            can also go and discover new cities!
          </p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setStage("trips")}
          >
            Continue
          </Button>
        </div>
      )}

      {stage === "trips" && (
        <div className="text-block animate__animated animate__fadeIn animate__faster">
          <p>
            This is the Trips page. Here, you'll see all of your upcoming and
            past trips. You'll be able to add friends to upcoming trips and
            confirm that past trips have been completed.
          </p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setStage("inbox")}
          >
            Continue
          </Button>
        </div>
      )}

      {stage === "inbox" && (
        <div className="text-block animate__animated animate__fadeIn animate__faster">
          <p>
            This is the Inbox page. Here, you'll see all of your messages and
            notifications. There's really not much else to say
          </p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setStage("final")}
          >
            Continue
          </Button>
        </div>
      )}

      {stage === "final" && (
        <div className="text-block animate__animated animate__fadeIn animate__faster">
          <p>
            There's more but I'm too lazy to show you right now, so I'll leave
            you here on your own. I hope you have a good time, somehow...
          </p>
          <Button
            variant="warning"
            type="button"
            onClick={() => setFirstTimeUser(false)}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default FirstTimeUserView;
