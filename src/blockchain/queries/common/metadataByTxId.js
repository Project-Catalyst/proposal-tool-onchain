import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

import { getRequestUrl } from "../utils";

export default function metadataByTxIdQuery(id, options = {}) {
  return useQuery(
    ["metadataByTxId", id],
    () =>
      axios
        .get(
          getRequestUrl("tx_metadata", {
            tx_id: `eq.${id.value}`,
            select: "*,tx(hash,block(time))",
          }),
        )
        .then(({ data }) => {
          if (!data.length) {
            throw new Error(`Could not find a metadata by transaction id ${id.value}`);
          } else {
            return data;
          }
        }),
    {
      staleTime: Infinity,
      select: (data) => data[0],
      ...options,
    },
  );
}
