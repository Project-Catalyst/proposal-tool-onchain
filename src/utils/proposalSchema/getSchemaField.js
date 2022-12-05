import dayjs from "dayjs";
import compact from "lodash/compact";
import fill from "lodash/fill";
import isInteger from "lodash/isInteger";

import { stringOrArray } from "@/utils";

import getComponent from "./getComponent";
import getInitialValue from "./getInitialValue";
import { getValidation } from "./validation";

export default function getSchemaField(fieldDefinition, proposalFormData) {
  if (Array.isArray(fieldDefinition)) {
    return compact(fieldDefinition.map((field) => getSchemaField(field, proposalFormData)));
  }

  const { type, codeName, label, meta } = fieldDefinition;

  if (type === "datetime" || meta?.hidden === 1) {
    return undefined;
  }

  const schemaField = {};

  schemaField.model = codeName;
  schemaField.component = getComponent(fieldDefinition);
  schemaField.label = label;

  schemaField.placeholder = meta?.placeholder;
  schemaField.help = stringOrArray(meta?.description || "");
  schemaField.readonly = meta?.auto === 1;
  schemaField.required = meta?.required === 1;

  schemaField.default = getInitialValue(fieldDefinition, proposalFormData);
  schemaField.validations = getValidation(fieldDefinition);

  if (type === "text") {
    schemaField.type = "textarea";
  } else if (type === "url") {
    schemaField.type = "url";
  } else if (type === "email") {
    schemaField.type = "email";
  } else if (type === "string" || type === "integer" || type === "float" || type === "decimal") {
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
  } else if (type === "date" || type === "daterange") {
    const now = dayjs();

    const min = meta?.min && dayjs(meta?.min).hour(0).minute(0).second(0).millisecond(0);
    const max = meta?.max && dayjs(meta?.max).hour(0).minute(0).second(0).millisecond(0);

    const minFromToday =
      isInteger(meta?.minFromToday) &&
      now.add(meta.minFromToday, "day").hour(0).minute(0).second(0).millisecond(0);
    const maxFromToday =
      isInteger(meta?.maxFromToday) &&
      now.add(meta.maxFromToday, "day").hour(0).minute(0).second(0).millisecond(0);

    if (min && minFromToday) {
      schemaField.min = dayjs.max(dayjs(min), dayjs(minFromToday)).toDate();
    } else {
      schemaField.min = (minFromToday || min)?.toDate();
    }

    if (max && maxFromToday) {
      schemaField.max = dayjs.min(dayjs(max), dayjs(maxFromToday)).toDate();
    } else {
      schemaField.max = (maxFromToday || max)?.toDate();
    }

    if (type === "daterange") {
      schemaField.range = true;
    } else {
      if (meta?.validValues) {
        schemaField.selectableDates = meta.validValues.map((value) => dayjs(value).toDate());
      }
      schemaField.multiple = meta.multiple === 1;
    }
  } else if (type === "file") {
    schemaField.accept = meta.accept;
    schemaField.multiple = meta.multiple === 1;
  }

  return schemaField;
}
