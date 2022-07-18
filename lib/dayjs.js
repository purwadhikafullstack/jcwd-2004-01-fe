import dayjs from "dayjs";
import "dayjs/locale/de";

const updateTerahir = (now) => {
  let update = dayjs(now).locale("de").format("DD MMMM YYYY, HH.mm WIB");
  return update;
};

export default updateTerahir;
