import Spinner from "react-bootstrap/Spinner";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
