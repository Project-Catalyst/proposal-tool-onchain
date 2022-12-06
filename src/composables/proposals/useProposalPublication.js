import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";

import { proposalPublishMutation } from "@/blockchain/mutations";
import { ipfsUploadMutation } from "@/blockchain/mutations/common";
import { useNotifications, useProposals, useProposalsPublished, useTxSubmit } from "@/composables";
import { useWalletStore } from "@/stores";
import { chunkString } from "@/utils";

function prepareValue(value, chunkValue = false) {
  if (Array.isArray(value)) {
    if (!isEmpty(value)) {
      return value.map((v) => prepareValue(v, chunkValue));
    }
  } else if (typeof value === "boolean") {
    return +value;
  } else if (typeof value === "string") {
    if (value !== "") {
      if (chunkValue) {
        return chunkString(value);
      } else {
        return value;
      }
    }
  } else if (value !== null && value !== undefined) {
    return value;
  }
}

function prepareToPublication(proposal, chunkValues = false) {
  return Object.entries(proposal).reduce((acc, [key, value]) => {
    const preparedValue = prepareValue(value, chunkValues);
    if (preparedValue !== undefined) {
      acc[key] = preparedValue;
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

    const preparedProposal = prepareToPublication(cloneDeep(proposal));

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
