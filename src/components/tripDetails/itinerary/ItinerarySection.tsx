import TripAccordion from "./TripAccordion";
import "./ItinerarySection.css";
import Trip from "../../../models/Trip";

interface Props {
  trip: Trip;
  cityName: string;
}

const ItinerarySection = ({ trip, cityName }: Props) => {
  return (
    <section className="ItinerarySection">
      <div className="itinerary-label-row">
        <h4>Itinerary</h4>
      </div>
      <TripAccordion trip={trip} cityName={cityName} />
    </section>
  );
};

export default ItinerarySection;
