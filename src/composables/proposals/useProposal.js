import { computed } from "vue";

import { useChallenge, useFund, useProposals, useProposalsPublished } from "@/composables";

export default function useProposal(proposalId) {
  const proposals = useProposals();
  const proposalsPublished = useProposalsPublished();

  const instance = proposals.getById(proposalId);

  const { instance: fund } = useFund(instance.fundHash);
  const { instance: challenge } = useChallenge(instance.fundHash, instance.challengeId);

  const title = instance["Proposal title"];

  const isPublished = computed(() => proposalsPublished.ids.value.includes(proposalId));
  const canPublish = computed(
    () => !isPublished.value && fund.value?.currentStages.includes("proposalPublishing"),
  );

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
    proposals.remove(proposalId);
  }

  return {
    title,
    instance,
    challenge: challenge.value,
    isPublished,
    canPublish,

    update,
    remove,
  };
}
