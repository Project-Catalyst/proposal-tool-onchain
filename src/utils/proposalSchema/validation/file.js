import { array, mixed } from "yup";

export default function getFileValidation(fieldDefinition) {
  let validation = mixed().test("isFile", "value must be a File instance", (value) => {
    return value === null || value instanceof File;
  });

  const { meta } = fieldDefinition;

  if (meta) {
    const { required, multiple, minItems, maxItems } = meta;

    if (multiple) {
      validation = array().of(validation);

      if (minItems) {
        if (required) {
          validation = validation.min(minItems);
        } else {
          validation = validation.test(
            "isEmptyOrMinLength",
            `this field must be empty or have at least ${minItems} items`,
            (value) => value.length === 0 || value.length >= minItems,
          );
        }
      }

      if (maxItems) {
        validation = validation.max(maxItems);
      }
    }
  }

  return validation;
}
