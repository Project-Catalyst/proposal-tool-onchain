import ButtonDropdown from "@/components/common/ButtonDropdown.vue";
import IconLoading from "@/components/common/IconLoading.vue";
import WrapperPage from "@/components/layout/WrapperPage.vue";

export default function setupComponents(app) {
  app.component("ButtonDropdown", ButtonDropdown);
  app.component("IconLoading", IconLoading);
  app.component("WrapperPage", WrapperPage);
}
