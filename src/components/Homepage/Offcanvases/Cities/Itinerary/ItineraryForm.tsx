import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { DateRange, Range } from "react-date-range";
import { useNavigate } from "react-router-dom";

import { Hotel } from "../../../../../models/AmadeusModels/HotelResponse";
import { NewTrip, Trip } from "../../../../../models/Trip";
import { Business } from "../../../../../models/Yelp";
import { getHotelsByCity } from "../../../../../services/amadeusService";
import { addTrip } from "../../../../../services/tripServices";
import {
  searchYelpArts,
  searchYelpBreakfast,
  searchYelpRestaurants,
} from "../../../../../services/yelpServices";
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

        const breakfastSpots: Business[] = (await searchYelpBreakfast(cityName))
          .businesses;
        const lunchAndDinnerSpots: Business[] = (
          await searchYelpRestaurants(cityName)
        ).businesses;
        const activities: Business[] = (await searchYelpArts(cityName))
          .businesses;

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

        const newTrip: NewTrip = {
          creatorUid: uid,
          cityId,
          nickname: "",
          startDate,
          endDate,
          hotel,
          schedule: [],
          photos: [],
          participants: [{ uid, accepted: true }],
          messages: [],
          completed: false,
          likesUids: [],
          comments: [],
        };

        for (let i = 0; i < duration; i++) {
          const breakfastIndex: number = Math.floor(
            Math.random() * breakfastSpots.length
          );
          let lunchAndDinnerIndex: number = Math.floor(
            Math.random() * lunchAndDinnerSpots.length
          );
          let activitiesIndex: number = Math.floor(
            Math.random() * activities.length
          );

          const breakfast: Business = breakfastSpots[breakfastIndex];
          breakfastSpots.splice(breakfastIndex, 1);

          const lunch: Business = lunchAndDinnerSpots[lunchAndDinnerIndex];
          lunchAndDinnerSpots.splice(lunchAndDinnerIndex, 1);
          lunchAndDinnerIndex = Math.floor(
            Math.random() * lunchAndDinnerSpots.length
          );

          const dinner: Business = lunchAndDinnerSpots[lunchAndDinnerIndex];
          lunchAndDinnerSpots.splice(lunchAndDinnerIndex, 1);

          const firstActivity: Business = activities[activitiesIndex];
          activities.splice(activitiesIndex, 1);
          activitiesIndex = Math.floor(Math.random() * activities.length);

          const secondActivity: Business = activities[activitiesIndex];
          activities.splice(activitiesIndex, 1);

          newTrip.schedule.push({
            breakfast: breakfast.name,
            breakfastPhoto: breakfast.image_url,
            breakfastAddress: breakfast.location.display_address,
            breakfastPhone: breakfast.display_phone,
            breakfastUrl: breakfast.url,
            lunch: lunch.name,
            lunchPhoto: lunch.image_url,
            lunchAddress: lunch.location.display_address,
            lunchPhone: lunch.display_phone,
            lunchURL: lunch.url,
            dinner: dinner.name,
            dinnerPhoto: dinner.image_url,
            dinnerAddress: dinner.location.display_address,
            dinnerPhone: dinner.display_phone,
            dinnerUrl: dinner.url,
            event1: firstActivity.name,
            event1Photo: firstActivity.image_url,
            event1Address: firstActivity.location.display_address,
            event1Phone: firstActivity.display_phone,
            event1Url: firstActivity.url,
            event2: secondActivity.name,
            event2Photo: secondActivity.image_url,
            event2Address: secondActivity.location.display_address,
            event2Phone: secondActivity.display_phone,
            event2Url: secondActivity.url,
          });
        }

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
