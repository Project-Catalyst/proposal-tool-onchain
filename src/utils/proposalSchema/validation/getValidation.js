import { mixed } from "yup";

import getBooleanValidation from "./boolean";
import getEmailValidation from "./email";
import getNumberValidation from "./number";
import getNumRangeValidation from "./numrange";
import getStringValidation from "./string";
import getUrlValidation from "./url";

export default function getValidation(fieldDefinition) {
  const { type, meta } = fieldDefinition;

  let validation = mixed();

  if ((type === "string" || type === "text") && meta) {
    validation = getStringValidation(fieldDefinition);
  } else if (type === "url") {
    validation = getUrlValidation();
  } else if (type === "email") {
    validation = getEmailValidation();
  } else if (type === "integer") {
    validation = getNumberValidation(fieldDefinition, true);
  } else if (type === "float" || type === "decimal") {
    validation = getNumberValidation(fieldDefinition, false);
  } else if (type === "numrange") {
    validation = getNumRangeValidation(fieldDefinition);
  } else if (type === "boolean") {
    validation = getBooleanValidation();
  }

  if (meta?.required) {
    validation = validation.required();
  }

  return validation;
}
