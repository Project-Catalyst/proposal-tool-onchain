export default function stringOrArray(value, delimiter = "") {
  if (Array.isArray(value)) {
    return value.join(delimiter);
  } else {
    return value;
  }
}
