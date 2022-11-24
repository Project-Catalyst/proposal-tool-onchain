import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

import { getMetadataSelectionUrl } from "./utils";

function fetchFunds() {
  return axios.get(getMetadataSelectionUrl("fundGenesis")).then(({ data }) => data);
}

export default function fundsQuery() {
  return useQuery(["funds"], fetchFunds, {
    staleTime: 60 * 60 * 1000,
  });
}
