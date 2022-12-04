import { string } from "yup";

import { htmlToText, is } from "@/utils";

export default function getHtmlValidation(fieldDefinition) {
  let validation = string().transform((value) => {
    if (meta?.required || meta?.lengthMin || meta?.lengthMax) {
      return htmlToText(value);
    } else {
      return value;
    }
  });

  const { meta } = fieldDefinition;

  if (meta) {
    const { lengthMin, lengthMax } = meta;

    if (is(lengthMin)) {
      validation = validation.min(lengthMin);
    }
    if (is(lengthMax)) {
      validation = validation.max(lengthMax);
    }
  }

  return validation;
}
