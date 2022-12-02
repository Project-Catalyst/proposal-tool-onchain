import compact from "lodash/compact";
import { ref } from "vue";

import { getSchemaField, validateSchema } from "@/utils/proposalSchema";

export default function useProposalSchema(proposalSchema /* , proposal = null */) {
  validateSchema(proposalSchema);

  const schema = [];

  for (const fieldDefinition of proposalSchema) {
    schema.push(getSchemaField(fieldDefinition));
  }

  return {
    schema: ref(compact(schema)),
  };
}
