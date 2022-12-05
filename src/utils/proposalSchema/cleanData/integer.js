export default function cleanInteger(value) {
  const cleanedValue = parseInt(value);
  return isNaN(cleanedValue) ? null : cleanedValue;
}
