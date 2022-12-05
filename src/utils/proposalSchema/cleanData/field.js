import sanitizeHtml from "sanitize-html";

import cleanDate from "./date";
import cleanFloat from "./float";
import cleanInteger from "./integer";

export default function cleanField(formData, fieldDefinition) {
  const { type } = fieldDefinition;

  const value = formData[fieldDefinition.codeName];

  if (type === "html") {
    return sanitizeHtml(value);
  } else if (type === "integer") {
    if (Array.isArray(value)) {
      return value.map(cleanInteger);
    } else {
      return cleanInteger(value);
    }
  } else if (type === "float" || type === "decimal") {
    if (Array.isArray(value)) {
      return value.map(cleanFloat);
    } else {
      return cleanFloat(value);
    }
  } else if (type === "boolean") {
    return value ?? null;
  } else if (type === "date" || type === "daterange") {
    if (Array.isArray(value)) {
      return value.map(cleanDate);
    } else {
      return cleanDate(value);
    }
  }

  return value;
}
