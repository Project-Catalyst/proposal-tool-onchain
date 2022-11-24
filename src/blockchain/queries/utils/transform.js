import { compactString } from "@/utils";

export function transformMetadata(metadata) {
  return {
    metadataId: metadata.id,
    metadataBytes: metadata.bytes.slice(2),
    creator: metadata.json.creator,
    blockTime: metadata.tx.block.time,
    txId: metadata.tx_id,
    txHash: metadata.tx.hash.slice(2),
    txHashCompact: compactString(metadata.tx.hash.slice(2)),
    ...metadata.json.payload,
  };
}
