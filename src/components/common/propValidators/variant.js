export default function variantPropValidator(value) {
  return [undefined, "primary", "info", "success", "warning", "danger"].includes(value);
}
