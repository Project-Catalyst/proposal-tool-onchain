import IconLoading from "@/components/common/IconLoading.vue";
import PageWrapper from "@/components/common/PageWrapper.vue";

export default function setupComponents(app) {
  app.component("IconLoading", IconLoading);
  app.component("PageWrapper", PageWrapper);
}
