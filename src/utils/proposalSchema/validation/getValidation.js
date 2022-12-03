import { mixed } from "yup";

import getBooleanValidation from "./boolean";
import getDateValidation from "./date";
import getDateRangeValidation from "./daterange";
import getEmailValidation from "./email";
import getFileValidation from "./file";
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
  } else if (type === "date") {
    validation = getDateValidation(fieldDefinition);
  } else if (type === "daterange") {
    validation = getDateRangeValidation(fieldDefinition);
  } else if (type === "file") {
    validation = getFileValidation(fieldDefinition);
  }

  if (meta?.required) {
    validation = validation.required();
  }

  return validation;
}
