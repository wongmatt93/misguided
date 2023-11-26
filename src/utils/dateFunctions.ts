export const getCurrentDateString: string = new Date().getTime().toString();

export const convertDateStringToText = (dateString: string): string =>
  new Date(Number(dateString)).toLocaleDateString();

export const getHhMm = (date: string): string => {
  const dateObject: Date = new Date(Number(date));
  let hh: number = dateObject.getHours();
  const amPm: string = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  hh = hh ? hh : 12;
  let mm: number | string = dateObject.getMinutes();
  mm = mm < 10 ? "0" + mm : mm;

  return hh + ":" + mm + " " + amPm;
};

export const timeStamp = (date: string) => {
  let difference: number = Number(new Date()) - Number(date);

  if (difference < 86400000) {
    return getHhMm(date);
  } else if (difference < 604800000) {
    const days = Math.floor(difference / 86400000);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (difference < 31560000000) {
    return new Date(Number(date)).toLocaleDateString();
  } else {
    const years = Math.floor(difference / 31560000000);
    return `${years} year${years > 1 ? "s" : ""}s ago`;
  }
};
