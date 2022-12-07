import cloneDeep from "lodash/cloneDeep";
import { markRaw, ref } from "vue";

import mandatoryFields from "@/assets/schema/mandatoryFields.json";
import { getSchemaField, validateSchema } from "@/utils/proposalSchema";

export default function useProposalSchema(proposalSchema, proposalFormData, isPublished) {
  const combinedSchema = [...mandatoryFields, ...proposalSchema];

  validateSchema(combinedSchema);

  const schema = [];

  for (const fieldDefinition of combinedSchema) {
    const field = getSchemaField(fieldDefinition, proposalFormData, isPublished);
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
