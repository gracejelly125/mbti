import { format } from "date-fns";
import { ko } from "date-fns/locale";

const changeTime = (timeStamp) => {
  let newTime = format(timeStamp, "PPP aa hh:mm", { locale: ko });
  return newTime;
};

export default changeTime;
