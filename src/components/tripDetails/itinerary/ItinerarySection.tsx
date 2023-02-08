import TripAccordion from "./TripAccordion";
import "./ItinerarySection.css";
import Trip from "../../../models/Trip";

interface Props {
  trip: Trip;
}

const ItinerarySection = ({ trip }: Props) => {
  return (
    <section className="ItinerarySection">
      <div className="itinerary-label-row">
        <h4>Itinerary</h4>
      </div>
      <TripAccordion trip={trip} />
    </section>
  );
};

export default ItinerarySection;
