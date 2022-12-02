import { string } from "yup";

import { is } from "@/utils";

export default function getStringValidation(fieldDefinition) {
  let validation = string().trim();

  const { meta } = fieldDefinition;

  if (meta) {
    const { lengthExact, lengthMin, lengthMax, lengthOptions, pattern } = meta;

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
  }

  return validation;
}
