import { string } from "yup";

import { htmlToText, is } from "@/utils";

export default function getHtmlValidation(fieldDefinition) {
  let validation = string().transform((value) => {
    if (typeof value !== "string") {
      return "";
    }
    if (meta?.required || meta?.lengthMin || meta?.lengthMax) {
      return htmlToText(value);
    } else {
      return value;
    }
  });

  const { meta } = fieldDefinition;

  if (meta) {
    const { required, lengthMin, lengthMax } = meta;

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

  return validation;
}
