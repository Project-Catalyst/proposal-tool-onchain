import { VueQueryPlugin } from "@tanstack/vue-query";
import { useNotifications } from "@/composables";

export default function setupVueQuery(app) {
  app.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          onError: (error) => useNotifications().danger(`Request error: ${error.message}`),
        },
      },
    },
  });
}
