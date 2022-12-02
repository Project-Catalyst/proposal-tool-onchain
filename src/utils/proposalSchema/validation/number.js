import { array, number } from "yup";

import { floatSafeRemainder, is } from "@/utils";

export default function getIntegerValidation(fieldDefinition, isInt) {
  let validation = (isInt ? number().integer() : number()).transform((value) =>
    isNaN(value) ? undefined : value,
  );

  const { meta } = fieldDefinition;

  if (meta) {
    const { min, max, step, validValues, multiple, minItems, maxItems, required } = meta;
    if (is(min) || is(max) || is(step)) {
      if (is(min)) {
        validation = validation.min(min);
      }

      if (is(max)) {
        validation = validation.max(max);
      }

      if (is(step)) {
        validation = validation.test(
          "divisibleBy",
          `value must be divisible by ${step}`,
          (value) => !value || floatSafeRemainder(value, step) === 0,
        );
      }
    } else if (is(validValues)) {
      if (!multiple) {
        validation = validation.oneOf(validValues);
      } else {
        validation = array().of((isInt ? number().integer() : number()).oneOf(validValues));
        if (minItems) {
          if (required) {
            validation = validation.min(minItems);
          } else {
            validation = validation.test(
              "isEmptyOrMinLength",
              `this field must be empty or have at least ${minItems} items`,
              (value) => value.length === 0 || value.length >= minItems,
            );
          }
        }
        if (maxItems) {
          validation = validation.max(maxItems);
        }
      }
    }
  }

  return validation;
}
