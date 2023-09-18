import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { signInWithGoogle } from "../../firebaseConfig";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <header>
        <h1>misguided</h1>
      </header>
      <main className="LandingMain">
        <div>
          <h2>Plan Your Dream Vacation</h2>
          <p>We make the plans. You pack your bags.</p>
        </div>
        <Card>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </Card>
      </main>
    </div>
  );
};

export default LandingPage;
