import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import flatten from "lodash/flatten";
import isNil from "lodash/isNil";
import { computed } from "vue";

import {
  useChallenge,
  useFund,
  useProposals,
  useProposalsPublished,
  useProposalsWithdrawn,
} from "@/composables";

export default function useProposal(proposalId) {
  const proposals = useProposals();
  const proposalsPublished = useProposalsPublished();
  const proposalsWithdrawn = useProposalsWithdrawn();

  const instance = proposals.getById(proposalId);

  const { instance: fund } = useFund(instance.fundHash);
  const { instance: challenge } = useChallenge(instance.fundHash, instance.challengeId);

  const title = instance.title;

  const instanceFormData = computed(() => {
    const formData = {};
    const proposalSchema = flatten(challenge.value.proposalSchema);
    const proposalData = cloneDeep(instance);

    for (const fieldName of Object.keys(proposalData)) {
      const fieldDefinition = proposalSchema.find(({ codeName }) => codeName === fieldName);

      if (!fieldDefinition || fieldDefinition.meta?.hidden) {
        continue;
      }

      const fieldType = fieldDefinition.type;
      const value = proposalData[fieldName];

      if (fieldType === "date" || fieldType === "daterange") {
        if (Array.isArray(value)) {
          formData[fieldName] = value.map((item) => (item ? dayjs(item).toDate() : null));
        } else {
          formData[fieldName] = value ? dayjs(value).toDate() : null;
        }
      } else if (fieldType === "integer" || fieldType === "float") {
        if (Array.isArray(value)) {
          formData[fieldName] = value.map((item) => (isNil(item) ? "" : item.toString()));
        } else {
          formData[fieldName] = isNil(value) ? "" : value.toString();
        }
      } else if (fieldType === "decimal") {
        if (Array.isArray(value)) {
          formData[fieldName] = value.map((item) =>
            isNil(item) ? "" : item.toFixed(fieldDefinition.meta?.decimals),
          );
        } else {
          formData[fieldName] = isNil(value) ? "" : value.toFixed(fieldDefinition.meta?.decimals);
        }
      } else {
        formData[fieldName] = value;
      }
    }

    return formData;
  });

  const cid = computed(() => proposalsPublished.getById(proposalId)?.proposalCID);

  const isPublished = computed(() => proposalsPublished.ids.value.includes(proposalId));
  const canPublish = computed(
    () => !isPublished.value && fund.value?.currentStages.includes("proposalPublishing"),
  );

  const isWithdrawn = computed(() => proposalsWithdrawn.ids.value.includes(proposalId));
  const canWithdraw = computed(() => isPublished.value && !isWithdrawn.value);

  function update(formData) {
    proposals.update(
      {
        ...formData,
        id: instance.id,
        fundHash: instance.fundHash,
        challengeId: instance.challengeId,
      },
      challenge.value.proposalSchema,
    );
  }

  function remove() {
    localStorage.removeItem(`editProposal:${proposalId}`);
    proposals.remove(proposalId);
  }

  return {
    title,
    cid,
    instance,
    instanceFormData,
    challenge: challenge.value,
    isPublished,
    canPublish,
    isWithdrawn,
    canWithdraw,

    update,
    remove,
  };
}
