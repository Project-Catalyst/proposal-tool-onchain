import { useIntervalFn } from "@vueuse/core";
import dayjs from "dayjs";

export default function useTick(interval = 1000) {
  const tick = dayjs.utc();

  useIntervalFn(() => (tick.value = dayjs.utc()), interval);

  return {
    tick,
  };
}
