import moment from "moment";

export const formatTimeToWork = work => {
  let start = work.start;
  const localTime = moment();
  const TimeDelivery = [];
  while (start <= work.end) {
    TimeDelivery.push(moment(start, "HH:mm").format("HH:mm"));
    start = moment(start, "HH:mm").add(30, "m");
  }
  return TimeDelivery.filter(item => moment(item, "HH:mm") > localTime);
};
