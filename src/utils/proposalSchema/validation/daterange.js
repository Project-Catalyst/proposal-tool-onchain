import dayjs from "dayjs";
import isInteger from "lodash/isInteger";
import { array, date } from "yup";

import { is } from "@/utils";

export default function getDateRangeValidation(fieldDefinition) {
  const { meta } = fieldDefinition;

  let dateValidation = date();

  if (meta) {
    let dateMin, dateMax;
    const now = dayjs();

    const min = meta.min && dayjs(meta.min).hour(0).minute(0).second(0).millisecond(0);
    const max = meta.max && dayjs(meta.max).hour(0).minute(0).second(0).millisecond(0);

    const minFromToday =
      isInteger(meta.minFromToday) &&
      now.add(meta.minFromToday, "day").hour(0).minute(0).second(0).millisecond(0);
    const maxFromToday =
      isInteger(meta.maxFromToday) &&
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
      dateValidation = dateValidation.min(dateMin.toDate());
    }

    if (dateMax) {
      dateValidation = dateValidation.max(dateMax.toDate());
    }
  }

  let validation = array()
    .of(dateValidation)
    .test("nonEmptyArray", "this is a required field", (value) => {
      return !meta.required || value.length;
    })
    .test("isCorrectRange", "Day 2 must be after day 1", (value) => {
      const d1 = dayjs(value[0]);
      const d2 = dayjs(value[1]);
      return d1.isSame(d2) || d1.isBefore(d2);
    });

  if (meta) {
    const { minRange, maxRange } = meta;

    if (is(minRange)) {
      validation = validation.test(
        "minRangeValue",
        `Range must be greater than or equal to ${minRange} days`,
        (value) => {
          return dayjs(value[1]).diff(dayjs(value[0]), "days") >= minRange;
        },
      );
    }

    if (is(maxRange)) {
      validation = validation.test(
        "maxRangeValue",
        `Range must be less than or equal to ${maxRange} days`,
        (value) => {
          return dayjs(value[1]).diff(dayjs(value[0]), "days") <= maxRange;
        },
      );
    }
  }

  return validation;
}
