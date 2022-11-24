export default function getEnvArrayValue(variableName) {
  return import.meta.env[variableName].split(/\W+/).map((value) => value.trim());
}
