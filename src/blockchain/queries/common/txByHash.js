import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

import { getRequestUrl } from "../utils";

export default function txByHashQuery(hash, options = {}) {
  return useQuery(
    ["txByHash", hash],
    () =>
      axios.get(getRequestUrl("tx", { hash: `eq.\\x${hash.value}` })).then(({ data }) => {
        if (!data.length) {
          throw new Error(`Could not find a transaction by hash ${hash.value}`);
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
