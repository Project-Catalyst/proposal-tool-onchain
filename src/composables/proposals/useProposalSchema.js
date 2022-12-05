import cloneDeep from "lodash/cloneDeep";
import { markRaw, ref } from "vue";

import { getSchemaField, validateSchema } from "@/utils/proposalSchema";

export default function useProposalSchema(proposalSchema, proposalFormData) {
  validateSchema(proposalSchema);

  const schema = [];

  for (const fieldDefinition of proposalSchema) {
    const field = getSchemaField(fieldDefinition, proposalFormData);
    if (field) {
      schema.push(field);
    }
  }

  const schemaRef = ref(cloneSchema());

  function cloneSchema() {
    const schemaClone = cloneDeep(schema);
    for (const field of schemaClone) {
      if (Array.isArray(field)) {
        field.forEach((f) => markRaw(f.component));
      } else {
        markRaw(field.component);
      }
    }
    return schemaClone;
  }

  function reset() {
    schemaRef.value = cloneSchema();
  }

  return {
    schema: schemaRef,
    reset,
  };
}
