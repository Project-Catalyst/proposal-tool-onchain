import axios from "axios";

import { getRequestUrl } from "../utils";

export default async function fetchCurrentBlock() {
  const response = await axios.get(getRequestUrl("block", { order: "id.desc", limit: 1 }));
  return response.data[0];
}
