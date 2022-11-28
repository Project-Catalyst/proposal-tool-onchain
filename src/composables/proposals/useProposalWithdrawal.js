import { proposalWithdrawalMutation } from "@/blockchain/mutations";
import { useProposalsPublished, useProposalsWithdrawn, useTxSubmit } from "@/composables";

export default function useProposalPublication() {
  const proposalsPublished = useProposalsPublished();
  const proposalsWithdrawn = useProposalsWithdrawn();

  const { submit } = useTxSubmit(proposalWithdrawalMutation);

  async function withdraw(proposalId) {
    const proposal = proposalsPublished.getById(proposalId);

    if (!proposal) {
      throw new Error("Proposal not found");
    }

    if (proposalsWithdrawn.ids.value.includes(proposalId)) {
      throw new Error("Proposal has already been withdrawn");
    }

    submit({
      fundHash: proposal.fundHash,
      challengeId: proposal.challengeId,
      proposalId,
    });
  }

  return {
    withdraw,
  };
}
