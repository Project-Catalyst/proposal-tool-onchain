import { storeToRefs } from "pinia";

import { useNotifications } from "@/composables";
import { useProposalsStore } from "@/stores";

export default function useProposals() {
  const notifications = useNotifications();
  const proposalsStore = useProposalsStore();

  const { all } = storeToRefs(proposalsStore);

  function cleanFormData(formData, proposalSchema) {
    const proposalData = {
      id: formData.id,
      fundHash: formData.fundHash,
      challengeId: formData.challengeId,
    };

    proposalSchema.forEach((item, idx) => {
      const label = item.label;
      const value = formData[`field${idx}`];

      if (item.type === "Number") {
        proposalData[label] = parseFloat(value);
      } else {
        proposalData[label] = value;
      }
    });

    return proposalData;
  }

  function getById(id) {
    return all.value.find((proposal) => proposal.id === id) || null;
  }

  function create(formData, proposalSchema) {
    proposalsStore.put(cleanFormData(formData, proposalSchema));
    notifications.success("New proposal created and saved in the local storage");
  }

  function update(formData, proposalSchema) {
    proposalsStore.put(cleanFormData(formData, proposalSchema));
    notifications.success("Proposal updated");
  }

  function remove(proposalId) {
    proposalsStore.remove(proposalId);
    notifications.success("Proposal removed");
  }

  return {
    all,

    getById,
    create,
    update,
    remove,
  };
}
