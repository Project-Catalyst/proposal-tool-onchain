import map from "lodash/map";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useNotifications } from "@/composables";
import { useProposalsStore } from "@/stores";

export default function useProposals() {
  const notifications = useNotifications();
  const proposalsStore = useProposalsStore();

  const { all } = storeToRefs(proposalsStore);
  const count = computed(() => all.value.length);

  const ids = computed(() => map(all.value, "id"));

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

  async function create(formData, proposalSchema) {
    await proposalsStore.create(cleanFormData(formData, proposalSchema));
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

  function importFromJson(json, merge = true) {
    if (!merge) {
      proposalsStore.clear();
    }
    for (const proposal of json) {
      proposalsStore.put(proposal);
    }
  }

  return {
    all,
    count,
    ids,

    getById,
    create,
    update,
    remove,
    importFromJson,
  };
}
