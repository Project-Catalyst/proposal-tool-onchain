const mapTypeInitialValue = {
  string: "",
  url: "",
  email: "",
  text: "",
  integer: null,
  float: null,
  decimal: null,
  numrange: [],
  boolean: undefined,
  date: null,
};

export default function getInitialValue(fieldDefinition) {
  if (Array.isArray(fieldDefinition)) {
    return Object.assign({}, ...fieldDefinition.map(getInitialValue));
  }

  if (fieldDefinition.meta?.hidden === 1) {
    return {};
  }

  const { type, meta } = fieldDefinition;

  let initialValue = mapTypeInitialValue[type];

  if ((type === "integer" || type === "float" || type === "decimal") && meta?.multiple) {
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
