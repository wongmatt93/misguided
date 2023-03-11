import { useEffect, useState } from "react";

const useTimer = (time: number): boolean => {
  const [timesUp, setTimesUp] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (!timesUp) {
      interval = setInterval(() => setTimesUp(true), time);
    }

    return () => clearInterval(interval);
  }, [timesUp, time]);

  return timesUp;
};

export default useTimer;
