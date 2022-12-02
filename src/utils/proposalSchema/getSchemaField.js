import compact from "lodash/compact";
import fill from "lodash/fill";

import { stringOrArray } from "@/utils";

import getComponent from "./getComponent";
import getInitialValue from "./getInitialValue";
import { getValidation } from "./validation";

export default function getSchemaField(fieldDefinition) {
  if (Array.isArray(fieldDefinition)) {
    return compact(fieldDefinition.map(getSchemaField));
  }

  if (fieldDefinition.meta?.hidden === 1) {
    return undefined;
  }

  const { type, codeName, label, meta } = fieldDefinition;

  const schemaField = {};

  schemaField.model = codeName;
  schemaField.component = getComponent(fieldDefinition);
  schemaField.label = label;

  schemaField.placeholder = meta?.placeholder;
  schemaField.help = stringOrArray(meta?.description || "");
  schemaField.readonly = meta?.auto === 1;
  schemaField.required = meta?.required === 1;

  schemaField.default = getInitialValue(fieldDefinition);
  schemaField.validations = getValidation(fieldDefinition);

  if (type === "text") {
    schemaField.type = "textarea";
  } else if (type === "url") {
    schemaField.type = "url";
  } else if (type === "email") {
    schemaField.type = "email";
  } else if (type === "integer" || type === "float" || type === "decimal") {
    if (meta?.validValues) {
      schemaField.options = meta.validValues;
      schemaField.multiple = meta.multiple === 1;
    } else {
      schemaField.min = meta?.min;
      schemaField.max = meta?.max;

      if (!meta?.decimals && meta?.step) {
        schemaField.decimals = meta.step.toString().split(".")[1]?.length || 0;
      } else {
        schemaField.decimals = meta?.decimals;
      }

      if (meta?.decimals && !meta?.step) {
        schemaField.step = +`0.${fill(new Array(meta.decimals - 1), 0).join("")}1`;
      } else {
        schemaField.step = meta?.step;
      }
    }

    if (type === "decimal") {
      schemaField.zerofill = true;
    }
  } else if (type === "numrange") {
    schemaField.min = meta?.min;
    schemaField.max = meta?.max;
    schemaField.step = meta?.step;
  }

  return schemaField;
}
