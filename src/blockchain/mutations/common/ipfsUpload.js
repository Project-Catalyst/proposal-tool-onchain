import { useMutation } from "@tanstack/vue-query";
import { Web3Storage } from "web3.storage";

import { sha256 } from "@/utils";

import { WEB3_STORAGE_ACCESS_TOKEN } from "../const";

function uploadToIpfs(data) {
  const jsonString = JSON.stringify(data);
  const jsonHash = sha256(jsonString);

  const blob = new Blob([jsonString], { type: "application/json" });
  const file = new File([blob], "proposals.json");

  const client = new Web3Storage({ token: WEB3_STORAGE_ACCESS_TOKEN });

  return client.put([file], { wrapWithDirectory: false, maxRetries: 1 }).then((cid) => ({
    cid,
    hash: jsonHash,
  }));
}

export default function uploadToIpfsMutation() {
  return useMutation(uploadToIpfs, {
    mutationKey: "ipfsUpload",
  });
}
