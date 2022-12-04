import dayjs from "dayjs";
import map from "lodash/map";
import { storeToRefs } from "pinia";
import sanitizeHtml from "sanitize-html";
import { computed } from "vue";

import { useNotifications } from "@/composables";
import { useProposalsStore } from "@/stores";

function cleanInteger(value) {
  const cleanedValue = parseInt(value);
  return isNaN(cleanedValue) ? null : cleanedValue;
}

function cleanFloat(value) {
  const cleanedValue = parseFloat(value);
  return isNaN(cleanedValue) ? null : cleanedValue;
}

function cleanDate(value) {
  return value ? dayjs(value).format("YYYY-MM-DD") : null;
}

function cleanField(formData, fieldDefinition) {
  const { type } = fieldDefinition;

  const value = formData[fieldDefinition.codeName];

  if (type === "html") {
    return sanitizeHtml(value);
  } else if (type === "integer") {
    if (Array.isArray(value)) {
      return value.map(cleanInteger);
    } else {
      return cleanInteger(value);
    }
  } else if (type === "float" || type === "decimal") {
    if (Array.isArray(value)) {
      return value.map(cleanFloat);
    } else {
      return cleanFloat(value);
    }
  } else if (type === "boolean") {
    return value ?? null;
  } else if (type === "date" || type === "daterange") {
    if (Array.isArray(value)) {
      return value.map(cleanDate);
    } else {
      return cleanDate(value);
    }
  }

  return value;
}

function cleanFormData(formData, proposalSchema) {
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

export default function useProposals() {
  const notifications = useNotifications();
  const proposalsStore = useProposalsStore();

  const { all } = storeToRefs(proposalsStore);
  const count = computed(() => all.value.length);

  const ids = computed(() => map(all.value, "id"));

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
