const mapTypeInitialValue = {
  string: "",
  url: "",
  email: "",
  text: "",
  html: {},
  integer: "",
  float: "",
  decimal: "",
  numrange: [],
  boolean: undefined,
  date: null,
  daterange: [],
  file: null,
};

export default function getInitialValue(fieldDefinition, proposalFormData) {
  if (fieldDefinition.meta?.hidden === 1) {
    return;
  }

  const { codeName, type, meta } = fieldDefinition;

  if (proposalFormData?.[codeName] !== undefined) {
    return proposalFormData?.[codeName];
  }

  let initialValue = mapTypeInitialValue[type];

  if (
    (type === "string" || type === "integer" || type === "float" || type === "decimal" || type === "file") &&
    meta?.multiple
  ) {
    initialValue = [];
  }

  if (type === "numrange") {
    const { min, max, maxRange } = meta;
    if (maxRange) {
      initialValue = [min, min + maxRange];
    } else {
      initialValue = [min, max];
    }
  }

  if (type === "date" && meta?.multiple) {
    initialValue = [];
  }

  return initialValue;
}
