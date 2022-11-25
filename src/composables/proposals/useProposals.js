import { storeToRefs } from "pinia";

import { useProposalsStore } from "@/stores";

export default function useProposals() {
  const proposalsStore = useProposalsStore();

  const { all } = storeToRefs(proposalsStore);

  return {
    all,
  };
}
