import "./LandingPage.css";
import { signInWithGoogle } from "../../firebaseConfig";
import "animate.css";

const LandingPage = () => {
  return (
    <section className="LandingPage">
      <div className="text-block">
        <h2>
          Plan Your{" "}
          <span
            style={{ display: "inline-block" }}
            className="animate__animated animate__hinge animate__delay-3s animate__slower"
          >
            Dream
          </span>{" "}
          Vacation
        </h2>
        <p>We make the plan. You pack your bags.</p>
      </div>

      <div className="sign-in-button-container">
        <button className="sign-in-button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default LandingPage;
