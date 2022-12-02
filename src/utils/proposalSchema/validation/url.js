import { string } from "yup";

export default function getUrlValidation() {
  return string().url();
}
