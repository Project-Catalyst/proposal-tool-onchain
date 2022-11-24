import uniq from "lodash/uniq";

import { OPERABLE_STAGES } from "@/blockchain/const";
import { camelToWords, compactString } from "@/utils";

import { fundActivityPeriod, fundCurrentStages } from "./fundStages";

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

export function transformFundsList(metadata, now) {
  const activityPeriod = fundActivityPeriod(metadata.json.payload.fundGenesis, now);

  const fundGenesisCurrentStages = fundCurrentStages(metadata.json.payload.fundGenesis, now);
  const currentStages = import.meta.env.DEV
    ? uniq([].concat(fundGenesisCurrentStages, OPERABLE_STAGES))
    : fundGenesisCurrentStages;

  return {
    ...transformMetadata(metadata),
    title: metadata.json.payload.fundGenesis.title,
    fundHashCompact: compactString(metadata.json.payload.fundHash),
    activityPeriod,
    activityPeriodVerbose: activityPeriod === -1 ? "past" : activityPeriod === 0 ? "current" : "future",
    currentStages,
    currentStagesVerbose: currentStages.map(camelToWords),
    qaStageVerbose: metadata.json.payload.fundGenesis.communityQualityAssuranceStage ? "yes" : "no",
  };
}
