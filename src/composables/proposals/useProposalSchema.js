import * as yup from "yup";

import { stringOrArray } from "@/utils";

export default function useProposalSchema(proposalSchema, proposal = null) {
  const fields = proposalSchema.map((item, idx) => {
    const field = {
      name: `field${idx}`,
      label: stringOrArray(item.label),
      required: !!item.required,
      help: stringOrArray(item.description),
    };

    if (item.type === "Boolean") {
      field.type = "checkbox";
      field.value = true;
    } else {
      field.type = "text";
    }

    return field;
  });

  const shape = {};
  proposalSchema.forEach((item, idx) => {
    let validator = yup;

    if (item.type === "Number") {
      validator = validator.number();
    } else if (item.type === "Boolean") {
      validator = validator.boolean();
    } else {
      validator = validator.string();
    }

    if (item.required) {
      validator = validator.required("Required field");
    }

    shape[`field${idx}`] = validator.label("The field");
  });
  const validationSchema = yup.object().shape(shape);

  const initialValues = {};
  if (!proposal) {
    proposalSchema.forEach((item, idx) => {
      let value;

      if (item.type === "Boolean") {
        value = undefined;
      } else {
        value = "";
      }

      initialValues[`field${idx}`] = value;
    });
  } else {
    proposalSchema.forEach((item, idx) => {
      let value;

      if (item.type === "Boolean") {
        value = proposal[item.label];
      } else {
        value = proposal[item.label].toString();
      }

      initialValues[`field${idx}`] = value;
    });
  }

  return {
    fields,
    validationSchema,
    initialValues,
  };
}
