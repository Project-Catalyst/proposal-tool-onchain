export default function cleanFloat(value) {
  const cleanedValue = parseFloat(value);
  return isNaN(cleanedValue) ? null : cleanedValue;
}
