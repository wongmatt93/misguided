import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { DateRange, Range } from "react-date-range";
import { useNavigate } from "react-router-dom";

import { Hotel } from "../../../../../models/AmadeusModels/HotelResponse";
import { NewTrip, SingleDaySchedule, Trip } from "../../../../../models/Trip";
import { getHotelsByCity } from "../../../../../services/amadeusService";
import { addTrip } from "../../../../../services/tripServices";
import { getYelpItinerary } from "../../../../../services/yelpServices";
import { doubleBook } from "../../../../../utils/tripFunctions";
import "./ItineraryForm.css";

interface Props {
  uid: string;
  upcomingTrips: Trip[];
  refreshProfile: () => Promise<void>;
  cityId: string;
  cityName: string;
  cityCode: string;
  show: boolean;
  closeItineraryModal: () => void;
}

const ItineraryForm = ({
  uid,
  upcomingTrips,
  refreshProfile,
  cityId,
  cityName,
  cityCode,
  show,
  closeItineraryModal,
}: Props) => {
  // variables
  const navigate = useNavigate();
  const [generating, setGenerating] = useState<boolean>(false);
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const startDate: string | undefined = dates[0].startDate
    ?.getTime()
    .toString();
  const endDate: string | undefined = dates[0].endDate?.getTime().toString();

  // functions
  const handleSubmit = async (): Promise<void> => {
    if (startDate && endDate) {
      // checks to see if trip is double booked before calling API's
      const isDoubleBooked: boolean = await doubleBook(
        upcomingTrips,
        startDate,
        endDate
      );

      if (!isDoubleBooked) {
        // shows generating view instead of the form
        setGenerating(true);

        const duration: number =
          endDate !== startDate
            ? (Number(endDate) - Number(startDate)) / (1000 * 3600 * 24) + 1
            : 1;

        // only calls Amadeus API if a hotel is necessary
        let hotel: string | null = null;
        if (duration > 1) {
          const hotels: Hotel[] = (await getHotelsByCity(cityCode)).data;
          const hotelIndex: number = Math.floor(Math.random() * hotels.length);
          hotel = hotels[hotelIndex].name;
        }

        const schedule: SingleDaySchedule[] = await getYelpItinerary(
          cityName,
          duration
        );

        const newTrip: NewTrip = {
          creatorUid: uid,
          cityId,
          nickname: "",
          startDate,
          endDate,
          hotel,
          schedule,
          photos: [],
          participants: [{ uid, accepted: true }],
          messages: [],
          completed: false,
          likesUids: [],
          comments: [],
        };

        const addedTrip: NewTrip = await addTrip(newTrip);
        await refreshProfile();
        addedTrip._id && navigate(`/trips/trip-details/${addedTrip._id}`);
      } else {
        alert("You have double booked your trip! Please select other dates");
      }
    }
  };

  return (
    <Modal className="ItineraryForm" show={show} onHide={closeItineraryModal}>
      {!generating ? (
        <>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
          />
          <Button
            variant="warning"
            type="submit"
            className="generate-button"
            onClick={handleSubmit}
          >
            Generate Itinerary
          </Button>
        </>
      ) : (
        <div className="generating-block">
          <Spinner />
          <p>Generating your trip!</p>
        </div>
      )}
    </Modal>
  );
};

export default ItineraryForm;
