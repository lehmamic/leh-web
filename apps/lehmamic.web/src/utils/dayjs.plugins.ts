import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import utc from "dayjs/plugin/utc";

let registered = false;

if (!registered) {
  dayjs.extend(minMax);
  dayjs.extend(utc)

  registered = true;
}
