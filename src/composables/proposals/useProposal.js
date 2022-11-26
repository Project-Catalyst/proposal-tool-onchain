import { useChallenge, useProposals } from "@/composables";

export default function useProposal(proposalId) {
  const proposals = useProposals();
  const instance = proposals.getById(proposalId);

  const { instance: challenge } = useChallenge(instance.fundHash, instance.challengeId);

  const title = instance["Proposal title"];

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

    update,
    remove,
  };
}
