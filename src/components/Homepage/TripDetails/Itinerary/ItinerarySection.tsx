import { SingleDaySchedule } from "../../../../models/Trip";
import "./ItinerarySection.css";
import TripAccordion from "./TripAccordion";

interface Props {
  cityName: string;
  startDate: string;
  endDate: string;
  hotel: string | null;
  schedule: SingleDaySchedule[];
}

const ItinerarySection = ({
  cityName,
  startDate,
  endDate,
  hotel,
  schedule,
}: Props) => {
  return (
    <section className="ItinerarySection">
      <div className="itinerary-label-row">
        <h2>Itinerary</h2>
      </div>
      <TripAccordion
        cityName={cityName}
        startDate={startDate}
        endDate={endDate}
        hotel={hotel}
        schedule={schedule}
      />
    </section>
  );
};

export default ItinerarySection;
