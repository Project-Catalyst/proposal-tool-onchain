import dayjs from "dayjs";

export default function cleanDate(value) {
  return value ? dayjs(value).format("YYYY-MM-DD") : null;
}
