import { array, string } from "yup";

import { is } from "@/utils";

export default function getStringValidation(fieldDefinition) {
  let validation = string().trim();

  const { meta } = fieldDefinition;

  if (meta) {
    const {
      lengthExact,
      lengthMin,
      lengthMax,
      lengthOptions,
      pattern,
      required,
      validValues,
      multiple,
      minItems,
      maxItems,
    } = meta;

    if (is(lengthExact) || is(lengthMin) || is(lengthMax) || is(lengthOptions) || is(pattern)) {
      if (is(lengthExact)) {
        validation = validation.length(lengthExact);
      } else if (is(lengthOptions)) {
        validation = validation.test(
          "oneOfLength",
          `string length must be equal one of following values: ${lengthOptions.join(", ")}`,
          (value) => lengthOptions.includes(value.length),
        );
      } else {
        if (is(lengthMin)) {
          validation = validation.min(lengthMin);
        }
        if (is(lengthMax)) {
          validation = validation.max(lengthMax);
        }
      }

      if (pattern) {
        validation = validation.matches(new RegExp(`^${pattern}$`));
      }
    } else if (is(validValues)) {
      validation = validation.oneOf(validValues);
    }

    if (multiple) {
      validation = array().of(validation);

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

  return validation;
}
