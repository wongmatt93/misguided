import { SingleDaySchedule } from "../../models/Trip";
import "./SingleDayItinerary.css";

interface Props {
  index: number;
  schedule: SingleDaySchedule;
}

const SingleDayItinerary = ({ index, schedule }: Props) => {
  return (
    <li className="SingleDayItinerary">
      <h3>Day {index + 1}</h3>
      <div className="img-container">
        <p>BREAKFAST - {schedule.breakfast}</p>
        <img src={schedule.breakfastPhoto} alt={schedule.breakfast} />
      </div>
      <div className="img-container">
        <p>ACTIVITY - {schedule.event1}</p>
        <img src={schedule.event1Photo} alt={schedule.event1} />
      </div>
      <div className="img-container">
        <p>LUNCH - {schedule.lunch}</p>
        <img src={schedule.lunchPhoto} alt={schedule.lunch} />
      </div>
      <div className="img-container">
        <p>ACTIVITY - {schedule.event2}</p>
        <img src={schedule.event2Photo} alt={schedule.event2} />
      </div>
      <div className="img-container">
        <p>DINNER - {schedule.dinner}</p>
        <img src={schedule.dinnerPhoto} alt={schedule.dinner} />
      </div>
    </li>
  );
};

export default SingleDayItinerary;
