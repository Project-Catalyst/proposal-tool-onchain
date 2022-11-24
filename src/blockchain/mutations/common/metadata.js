import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";

import { useWalletStore } from "@/stores";

export default function metadataMutation(options = {}) {
  const { selectedWalletApi } = storeToRefs(useWalletStore());
  return {
    mutation: useMutation((txCbor) => selectedWalletApi.value?.submitTx(txCbor), options),
  };
}
