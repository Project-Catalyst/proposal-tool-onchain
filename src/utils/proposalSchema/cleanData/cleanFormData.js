import cleanField from "./field";

export default function cleanFormData(formData, proposalSchema) {
  const proposalData = {
    id: formData.id,
    fundHash: formData.fundHash,
    challengeId: formData.challengeId,
  };

  proposalSchema.forEach((item) => {
    if (Array.isArray(item)) {
      for (const i of item) {
        proposalData[i.codeName] = cleanField(formData, i);
      }
    } else {
      proposalData[item.codeName] = cleanField(formData, item);
    }
  });

  return proposalData;
}
