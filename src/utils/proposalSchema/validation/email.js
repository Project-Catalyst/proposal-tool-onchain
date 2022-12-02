import { string } from "yup";

export default function getEmailValidation() {
  return string().email();
}
