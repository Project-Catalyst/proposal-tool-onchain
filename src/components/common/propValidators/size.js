export default function sizePropValidator(value) {
  return [undefined, "small", "medium", "large"].includes(value);
}
