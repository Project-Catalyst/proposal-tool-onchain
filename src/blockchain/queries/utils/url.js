import { POSTGREST_API_URL, TX_METADATA_KEY, TX_METADATA_VERSION } from "../const";

export function getRequestUrl(path, params = {}) {
  return `${POSTGREST_API_URL}/${path}?${new URLSearchParams(params)}`;
}

export function getMetadataSelectionUrl(action = null, params = {}) {
  const _params = {
    key: `eq.${TX_METADATA_KEY}`,
    "json->>version": `eq.${TX_METADATA_VERSION}`,
    select: "*,tx(hash,block(time))",
    ...params,
  };
  if (action) {
    _params["json->>action"] = `eq.${action}`;
  }
  return getRequestUrl("tx_metadata", _params);
}
