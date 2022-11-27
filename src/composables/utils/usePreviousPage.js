import get from "lodash/get";
import { useRouter } from "vue-router";

export default function usePreviousPage({ defaultLocation }) {
  const router = useRouter();
  const path = get(router, "options.history.state.back");

  function go() {
    if (path) {
      router.push({ path });
    } else {
      router.push(defaultLocation || { name: "home" });
    }
  }

  return {
    path,

    go,
  };
}
