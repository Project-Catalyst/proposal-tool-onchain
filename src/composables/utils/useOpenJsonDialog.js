import { useFileDialog } from "@vueuse/core";
import { watch } from "vue";

import { useNotifications } from "@/composables";

export default function useOpenJsonDialog({ onSuccess }) {
  const notifications = useNotifications();

  const { files, open } = useFileDialog({ multiple: false });

  watch(files, async () => {
    if (files.value[0] instanceof Blob) {
      try {
        const fileContent = await files.value[0].text();
        const json = JSON.parse(fileContent);
        onSuccess(json);
      } catch (error) {
        notifications.danger("Selected file does not contain a valid JSON");
      }
    }
  });

  return {
    files,

    open,
  };
}
