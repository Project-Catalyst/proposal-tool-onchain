import { useMutation } from "@tanstack/vue-query";
import sjcl from "sjcl";
import { Web3Storage } from "web3.storage";

import { WEB3_STORAGE_ACCESS_TOKEN } from "../const";

function uploadToIpfs(data) {
  const jsonString = JSON.stringify(data);
  const jsonStringBitArray = sjcl.hash.sha256.hash(jsonString);
  const jsonHash = sjcl.codec.hex.fromBits(jsonStringBitArray);

  const blob = new Blob([jsonString], { type: "application/json" });
  const file = new File([blob], "assessments.json");

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
