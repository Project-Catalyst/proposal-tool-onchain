import { array, number } from "yup";

import { floatSafeRemainder, is } from "@/utils";

export default function getNumRangeValidation(fieldDefinition) {
  const {
    meta: { min, max, step, minRange, maxRange },
  } = fieldDefinition;

  let validation = array().of(number().min(+min).max(+max)).length(2);

  if (is(step)) {
    validation = validation.test("divisibleBy", `range values must be divisible by ${step}`, (value) => {
      return floatSafeRemainder(value[0], +step) === 0 && floatSafeRemainder(value[1], +step) === 0;
    });
  }

  if (is(minRange)) {
    validation = validation.test(
      "minRangeValue",
      `Range must be greater than or equal to ${minRange}`,
      (value) => {
        return value[1] - value[0] >= +minRange;
      },
    );
  }

  if (is(maxRange)) {
    validation = validation.test(
      "maxRangeValue",
      `Range must be less than or equal to ${maxRange}`,
      (value) => {
        return value[1] - value[0] <= +maxRange;
      },
    );
  }

  return validation;
}
