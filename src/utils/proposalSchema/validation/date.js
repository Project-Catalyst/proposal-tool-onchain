import dayjs from "dayjs";
import isInteger from "lodash/isInteger";
import { array, date } from "yup";

function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export default function getDateValidation(fieldDefinition) {
  let validation = date();

  const { meta } = fieldDefinition;

  if (!meta?.required) {
    validation = validation.nullable();
  }

  if (meta) {
    const { validValues, multiple } = meta;

    if (validValues) {
      const validValueStrings = validValues.map((value) => formatDate(dayjs(value).toDate()));

      validation = validation.test("oneOfDate", "choose one of the possible dates", (value) => {
        return (!meta?.required && value === null) || validValueStrings.includes(formatDate(value));
      });
    } else {
      let dateMin, dateMax;
      const now = dayjs();

      const min = meta?.min && dayjs(meta?.min).hour(0).minute(0).second(0).millisecond(0);
      const max = meta?.max && dayjs(meta?.max).hour(0).minute(0).second(0).millisecond(0);

      const minFromToday =
        isInteger(meta?.minFromToday) &&
        now.add(meta.minFromToday, "day").hour(0).minute(0).second(0).millisecond(0);
      const maxFromToday =
        isInteger(meta?.maxFromToday) &&
        now.add(meta.maxFromToday, "day").hour(0).minute(0).second(0).millisecond(0);

      if (min && minFromToday) {
        dateMin = dayjs.max(min, minFromToday);
      } else {
        dateMin = minFromToday || min;
      }

      if (max && maxFromToday) {
        dateMax = dayjs.min(max, maxFromToday);
      } else {
        dateMax = maxFromToday || max;
      }

      if (dateMin) {
        validation = validation.min(dateMin.toDate());
      }

      if (dateMax) {
        validation = validation.max(dateMax.toDate());
      }
    }

    if (multiple) {
      validation = array().of(validation);
    }
  }

  return validation;
}
