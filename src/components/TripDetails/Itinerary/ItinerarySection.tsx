import TripAccordion from "./TripAccordion";
import "./ItinerarySection.css";
import FullTrip from "../../../models/Trip";

interface Props {
  trip: FullTrip;
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
