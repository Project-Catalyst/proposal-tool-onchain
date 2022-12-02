import flatten from "lodash/flatten";
import isArray from "lodash/isArray";
import isInteger from "lodash/isInteger";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import uniq from "lodash/uniq";

import { is } from "@/utils";

const validSchemaPropertyNames = ["codeName", "label", "type", "meta"];

const codeNameRegExp = /^[a-zA-Z][a-zA-Z0-9_]+$/;

const validTypes = ["string", "url", "email", "text", "integer", "float", "decimal", "numrange", "boolean"];

const commonValidMetaPropertyNames = ["description", "required", "auto", "hidden"];

const mapTypeValidMetaPropertyNames = {
  string: ["placeholder", "lengthExact", "lengthMin", "lengthMax", "lengthOptions", "pattern"],
  url: ["placeholder"],
  email: ["placeholder"],
  text: ["placeholder", "lengthMin", "lengthMax"],
  integer: ["placeholder", "min", "max", "step", "validValues", "multiple", "minItems", "maxItems"],
  float: ["placeholder", "min", "max", "step", "validValues", "multiple", "minItems", "maxItems"],
  decimal: [
    "placeholder",
    "min",
    "max",
    "step",
    "validValues",
    "multiple",
    "minItems",
    "maxItems",
    "decimals",
  ],
  numrange: ["min", "max", "step", "minRange", "maxRange"],
  boolean: [],
};

function isNumberBoolean(value) {
  return value === 0 || value === 1;
}

function validateMetaField(fieldDefinition) {
  const meta = fieldDefinition.meta;

  // meta can be undefined
  if (meta === undefined) {
    return;
  }

  const validMetaPropertyNames = [
    ...commonValidMetaPropertyNames,
    ...mapTypeValidMetaPropertyNames[fieldDefinition.type],
  ];

  // only valid properties in the meta
  if (Object.keys(meta).some((propName) => !validMetaPropertyNames.includes(propName))) {
    throw new Error("Field meta contains unknown properties");
  }

  const { required, auto, hidden, placeholder, description } = meta;

  // 'required' must be either 0 or 1
  if (is(required) && !isNumberBoolean(required)) {
    throw new Error("Invalid meta.required value");
  }

  // 'auto' must be either 0 or 1
  if (is(auto) && !isNumberBoolean(auto)) {
    throw new Error("Invalid meta.auto value");
  }

  // 'hidden' must be either 0 or 1
  if (is(hidden) && !isNumberBoolean(hidden)) {
    throw new Error("Invalid meta.hidden value");
  }

  // 'placeholder' must be a string of length less or equal 64
  if (is(placeholder) && (!isString(placeholder) || placeholder.length > 64)) {
    throw new Error("meta.placeholder must be a string of length less or equal 64");
  }

  // 'description' must be either string or array of strings, string length <= 64
  if (description) {
    if (isArray(description)) {
      if (description.some((line) => !isString(line) || line.length > 64)) {
        throw new Error("Invalid meta.description value");
      }
    } else if (!isString(description) || description.length > 64) {
      throw new Error("Invalid meta.description value");
    }
  }

  const { type } = fieldDefinition;

  // string and text types specific meta fields
  if (type === "string" || type === "text") {
    const { lengthExact, lengthMin, lengthMax, lengthOptions, pattern } = meta;

    // 'lengthExact' must be an integer
    if (is(lengthExact) && !isInteger(lengthExact)) {
      throw new Error("Invalid meta.lengthExact value");
    }

    // 'lengthOptions' must be an array of integers
    if (is(lengthOptions) && (!isArray(lengthOptions) || !lengthOptions.every(isInteger))) {
      throw new Error("meta.lengthOptions must be an array of integers");
    }

    // 'lengthExact' not mixed with other length validations
    if (is(lengthExact) && (is(lengthMin) || is(lengthMax))) {
      throw new Error("Ambiguous string length validation conditions");
    }

    // 'lengthOptions' not mixed with other length validations
    if (is(lengthOptions) && (is(lengthMin) || is(lengthMax))) {
      throw new Error("Ambiguous string length validation conditions");
    }

    // 'lengthOptions' and 'lengthExact' does not exist together
    if (is(lengthOptions) && is(lengthExact)) {
      throw new Error("Ambiguous string length validation conditions");
    }

    // 'lengthMin' must be an integer
    if (is(lengthMin) && !isInteger(lengthMin)) {
      throw new Error("Invalid meta.lengthMin value");
    }

    // 'lengthMax' must be an integer
    if (is(lengthMax) && !isInteger(lengthMax)) {
      throw new Error("Invalid meta.lengthMax value");
    }

    // 'lengthMax' must be greater than 'lengthMin'
    if (is(lengthMin) && is(lengthMax) && lengthMin >= lengthMax) {
      throw new Error("meta.lengthMax must be greater than meta.lengthMin");
    }

    // 'pattern' must be a string
    if (is(pattern) && !isString(pattern)) {
      throw new Error("meta.pattern must be a string");
    }
  }

  // numeric type specific meta fields
  if (type === "integer" || type === "float" || type === "decimal") {
    const { min, max, step, validValues, multiple, minItems, maxItems } = meta;
    const valueValidator = type === "integer" ? isInteger : isNumber;

    // 'min' must be an integer
    if (is(min) && !valueValidator(min)) {
      throw new Error("Invalid meta.min value");
    }

    // 'max' must be an integer
    if (is(max) && !valueValidator(max)) {
      throw new Error("Invalid meta.max value");
    }

    // 'max' must be greater than 'min'
    if (is(min) && is(max) && min >= max) {
      throw new Error("meta.max must be greater than meta.min");
    }

    // 'step' must be an integer
    if (is(step) && !valueValidator(step)) {
      throw new Error("Invalid meta.step value");
    }

    // 'validValues' must be an array of integers
    if (is(validValues) && (!isArray(validValues) || !validValues.every(valueValidator))) {
      throw new Error("meta.validValues must be an array of integers");
    }

    // 'multiple' must be either 0 or 1
    if (is(multiple) && !isNumberBoolean(multiple)) {
      throw new Error("Invalid meta.multiple value");
    }

    // 'multiple' can be used only with 'validValues'
    if (is(multiple) && !is(validValues)) {
      throw new Error("meta.multiple can be used only when meta.validValues defined");
    }

    // 'minItems' must be an integer
    if (is(minItems) && !isInteger(minItems)) {
      throw new Error("Invalid meta.minItems value");
    }

    // 'maxItems' must be an integer
    if (is(maxItems) && !isInteger(maxItems)) {
      throw new Error("Invalid meta.maxItems value");
    }

    // 'maxItems' must be greater than 'minItems'
    if (is(minItems) && is(maxItems) && minItems >= maxItems) {
      throw new Error("meta.maxItems must be greater than meta.minItems");
    }

    // 'minItems' can be used only with 'multiple'
    if (is(minItems) && !is(multiple)) {
      throw new Error("meta.minItems can be used only when meta.multiple === 1");
    }

    // 'maxItems' can be used only with 'multiple'
    if (is(maxItems) && !is(multiple)) {
      throw new Error("meta.maxItems can be used only when meta.multiple === 1");
    }

    // 'min'/'max'/'step' not mixed with 'validValues'
    if ((is(min) || is(max) || is(step)) && is(validValues)) {
      throw new Error("Ambiguous integer validation conditions");
    }
  }

  // decimal type specific meta fields
  if (type === "decimal") {
    const { decimals } = meta;

    // 'decimals' must be an integer not greater than 17
    if (is(decimals) && (!isInteger(decimals) || decimals > 17)) {
      throw new Error("Invalid meta.decimals value");
    }
  }

  // numrange type specific meta fields
  if (type === "numrange") {
    const { min, max, step, minRange, maxRange } = meta;

    // 'min' required and must be a number
    if (!is(min) || !isNumber(min)) {
      throw new Error("Invalid meta.min value");
    }

    // 'max' required and must be a number
    if (!is(max) || !isNumber(max)) {
      throw new Error("Invalid meta.max value");
    }

    // 'max' must be greater than 'min'
    if (min >= max) {
      throw new Error("meta.max must be greater than meta.min");
    }

    // 'step' must be a number
    if (is(step) && !isNumber(step)) {
      throw new Error("Invalid meta.step value");
    }

    // 'minRange' must be a number
    if (is(minRange) && !isNumber(minRange)) {
      throw new Error("Invalid meta.minRange value");
    }

    // 'minRange' must be less than whole range
    if (is(minRange) && minRange > Math.abs(max) - Math.abs(min)) {
      throw new Error("Invalid meta.minRange value");
    }

    // 'maxRange' must be a number
    if (is(maxRange) && !isNumber(maxRange)) {
      throw new Error("Invalid meta.maxRange value");
    }

    // 'maxRange' must be greater than 'minRange'
    if (is(minRange) && is(maxRange) && minRange >= maxRange) {
      throw new Error("meta.maxRange must be greater than meta.minRange");
    }
  }
}

export default function validateProposalSchema(proposalSchema, isNested = false) {
  // field code names uniqueness
  const fieldCodeNames = flatten(proposalSchema).map(({ codeName }) => codeName);
  if (fieldCodeNames.length !== uniq(fieldCodeNames).length) {
    throw new Error("Fields `codeName` values must be unique across the schema");
  }

  for (const fieldDefinition of proposalSchema) {
    // support for one-level definitions nesting
    if (isArray(fieldDefinition)) {
      if (!isNested) {
        validateProposalSchema(fieldDefinition, true);
        continue;
      } else {
        throw new Error("Only one level of nesting premitted");
      }
    }

    // only valid properties in the definition
    if (Object.keys(fieldDefinition).some((propName) => !validSchemaPropertyNames.includes(propName))) {
      throw new Error("Field definition contains unknown properties");
    }

    // codeName value is valid
    if (!codeNameRegExp.test(fieldDefinition.codeName)) {
      throw new Error("Invalid field codeName");
    }

    // label exists
    if (!fieldDefinition.label) {
      throw new Error("Field definition must contain valuable `label` property");
    }

    // type exists and has valid value
    if (!fieldDefinition.type) {
      throw new Error("Field definition must contain `type` property");
    } else if (!validTypes.includes(fieldDefinition.type)) {
      throw new Error(`Invalid type of field \`${fieldDefinition.type}\``);
    }

    // metadata is valid
    validateMetaField(fieldDefinition);
  }
}
