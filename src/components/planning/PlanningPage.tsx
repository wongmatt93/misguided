import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import City from "../../models/City";
import { Hotel } from "../../models/amadeus/HotelResponse";
import { getHotelsByCity } from "../../services/amadeusService";
import { getCityById } from "../../services/cityService";
import ItineraryModal from "./ItineraryModal";
import PlanningForm from "./PlanningForm";
import "./PlanningPage.css";
import {
  searchYelpArts,
  searchYelpBreakfast,
  searchYelpRestaurants,
} from "../../services/yelpService";
import { Business } from "../../models/Yelp";
import Trip from "../../models/Trip";
import { addTrip, getLatestTrip } from "../../services/tripServices";
import { addNewUserTrip } from "../../services/userService";
import { UserTrip } from "../../models/UserProfile";

const PlanningPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const cityId: string | undefined = useParams().cityId;
  const [city, setCity] = useState<City | null>(null);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [show, setShow] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Business[]>([]);
  const [breakfast, setBreakfast] = useState<Business[]>([]);
  const [events, setEvents] = useState<Business[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    cityId &&
      getCityById(cityId).then((response) => {
        setCity(response);
        getHotelsByCity(response.cityCode).then((response) =>
          setHotels(response.data)
        );
        searchYelpRestaurants(response.cityName).then((response) =>
          setRestaurants(response.businesses)
        );
        searchYelpBreakfast(response.cityName).then((response) =>
          setBreakfast(response.businesses)
        );
        searchYelpArts(response.cityName).then((response) =>
          setEvents(response.businesses)
        );
      });
  }, [cityId]);

  const handleClose = (): void => {
    setShow(false);
  };
  const handleShow = (): void => setShow(true);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (userProfile && city) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
      const duration =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

      if (duration > 0) {
        const index: number = Math.floor(Math.random() * hotels.length);

        const newTrip: Trip = {
          creatorUid: userProfile.uid,
          cityId: city._id!,
          date1,
          date2,
          hotel: duration > 1 ? hotels[index].name : null,
          schedule: [],
          photos: [],
          participants: [
            {
              uid: userProfile.uid,
            },
          ],
          messages: [],
          completed: false,
          likes: [],
          comments: [],
        };

        for (let i = 0; i < duration; i++) {
          if (restaurants.length) {
            const index: number = Math.floor(Math.random() * breakfast.length);
            const lunchIndex: number = Math.floor(
              Math.random() * restaurants.length
            );
            const dinnerIndex: number = Math.floor(
              Math.random() * restaurants.length
            );
            const eventOneIndex: number = Math.floor(
              Math.random() * events.length
            );
            const eventTwoIndex: number = Math.floor(
              Math.random() * events.length
            );
            newTrip.schedule.push({
              breakfast: breakfast[index].name,
              breakfastPhoto: breakfast[index].image_url,
              breakfastAddress: breakfast[index].location.display_address,
              breakfastPhone: breakfast[index].display_phone,
              breakfastUrl: breakfast[index].url,
              lunch: restaurants[lunchIndex].name,
              lunchPhoto: restaurants[lunchIndex].image_url,
              lunchAddress: restaurants[lunchIndex].location.display_address,
              lunchPhone: restaurants[lunchIndex].display_phone,
              lunchURL: restaurants[lunchIndex].url,
              dinner: restaurants[dinnerIndex].name,
              dinnerPhoto: restaurants[dinnerIndex].image_url,
              dinnerAddress: restaurants[dinnerIndex].location.display_address,
              dinnerPhone: restaurants[dinnerIndex].display_phone,
              dinnerUrl: restaurants[dinnerIndex].url,
              event1: events[eventOneIndex].name,
              event1Photo: events[eventOneIndex].image_url,
              event1Address: events[eventOneIndex].location.display_address,
              event1Phone: events[eventOneIndex].display_phone,
              event1Url: events[eventOneIndex].url,
              event2: events[eventTwoIndex].name,
              event2Photo: events[eventTwoIndex].image_url,
              event2Address: events[eventTwoIndex].location.display_address,
              event2Phone: events[eventTwoIndex].display_phone,
              event2Url: events[eventTwoIndex].url,
            });
          }
        }

        setTrip(newTrip);
        addTrip(newTrip).then(() => {
          getLatestTrip(userProfile.uid).then((response) => {
            const newUserTrip: UserTrip = {
              tripId: response[0]._id!,
              accepted: true,
            };

            addNewUserTrip(userProfile.uid, newUserTrip).then(() =>
              refreshProfile(userProfile.uid)
            );
          });
        });

        handleShow();
      } else {
        alert("Your dates are stupid");
      }
    }
  };

  return (
    <>
      <header className="PlanningHeader">
        <h1>choose your dates</h1>
      </header>
      <main className="PlanningMain">
        <PlanningForm
          date1={date1}
          date2={date2}
          setDate1={setDate1}
          setDate2={setDate2}
          handleSubmit={handleSubmit}
        />
        <ItineraryModal trip={trip} show={show} handleClose={handleClose} />
      </main>
    </>
  );
};

export default PlanningPage;
