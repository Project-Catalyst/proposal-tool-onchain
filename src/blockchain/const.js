import { getEnvArrayValue } from "@/utils";

export const OPERABLE_STAGES = getEnvArrayValue("VITE_OPERABLE_STAGES");

export const TX_METADATA_KEY = import.meta.env.VITE_CARDANO_TX_METADATA_KEY;
export const TX_METADATA_VERSION = import.meta.env.VITE_CARDANO_TX_METADATA_VERSION;
