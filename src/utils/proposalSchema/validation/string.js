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
        if (required) {
          validation = validation.length(lengthExact);
        } else {
          validation = validation.test(
            "isEmptyOrExactLength",
            `this must be exactly ${lengthExact} characters`,
            (value) => value.length === 0 || value.length === lengthExact,
          );
        }
      } else if (is(lengthOptions)) {
        validation = validation.test(
          "oneOfLength",
          `string length must be equal one of following values: ${lengthOptions.join(", ")}`,
          (value) => (!required && value.length === 0) || lengthOptions.includes(value.length),
        );
      } else {
        if (is(lengthMin)) {
          if (required) {
            validation = validation.min(lengthMin);
          } else {
            validation = validation.test(
              "isEmptyOrMinLength",
              `this must be at least ${lengthMin} characters`,
              (value) => value.length === 0 || value.length >= lengthMin,
            );
          }
        }
        if (is(lengthMax)) {
          validation = validation.max(lengthMax);
        }
      }

      if (pattern) {
        if (required) {
          validation = validation.matches(new RegExp(`^${pattern}$`));
        } else {
          validation = validation.matches(new RegExp(`^(${pattern})?$`));
        }
      }
    } else if (is(validValues)) {
      const _validValues = [...validValues];
      if (!required) {
        _validValues.push("");
      }
      validation = validation.oneOf(_validValues);
    }

    if (multiple) {
      validation = array().of(validation);

      if (minItems) {
        if (required) {
          validation = validation.min(minItems);
        } else {
          validation = validation.test(
            "isEmptyOrMinItems",
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
