import { proposalPublishMutation } from "@/blockchain/mutations";
import { ipfsUploadMutation } from "@/blockchain/mutations/common";
import { useNotifications, useProposals, useProposalsPublished, useTxSubmit } from "@/composables";
import { useWalletStore } from "@/stores";
import { chunkString } from "@/utils";

function prepareToPublication(proposal, chunkValues = false) {
  return Object.entries(proposal).reduce((acc, [key, value]) => {
    if (typeof value === "boolean") {
      acc[key] = +value;
    } else if (typeof value === "string" && chunkValues) {
      acc[key] = chunkString(value);
    } else if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export default function useProposalPublication() {
  const notifications = useNotifications();
  const walletStore = useWalletStore();
  const proposals = useProposals();
  const proposalsPublished = useProposalsPublished();

  const { isSuccess, mutateAsync } = ipfsUploadMutation();
  const { submit } = useTxSubmit(proposalPublishMutation);

  async function publish(proposalId) {
    let cid, hash;

    const proposal = proposals.getById(proposalId);

    if (!proposal) {
      throw new Error("Proposal not found");
    }

    if (proposalsPublished.ids.value.includes(proposalId)) {
      throw new Error("Proposal has already been published");
    }

    const preparedProposal = prepareToPublication(proposal);

    walletStore.setIsBusy(true);

    try {
      ({ cid, hash } = await mutateAsync(preparedProposal));
    } catch (error) {
      notifications.danger(`Upload to IPFS failed: ${error.message}`);
    } finally {
      walletStore.setIsBusy(false);
    }

    if (isSuccess.value) {
      submit({
        fundHash: proposal.fundHash,
        challengeId: proposal.challengeId,
        proposalId: proposal.id,
        proposalHash: hash,
        proposalCID: cid,
      });
    }
  }

  return {
    publish,
  };
}
