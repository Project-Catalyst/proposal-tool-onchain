import ButtonDropdown from "@/components/common/ButtonDropdown.vue";
import ButtonTxSubmit from "@/components/common/ButtonTxSubmit.vue";
import IconLoading from "@/components/common/IconLoading.vue";
import TooltipIf from "@/components/common/TooltipIf.vue";
import WrapperPage from "@/components/layout/WrapperPage.vue";

export default function setupComponents(app) {
  app.component("ButtonDropdown", ButtonDropdown);
  app.component("ButtonTxSubmit", ButtonTxSubmit);
  app.component("IconLoading", IconLoading);
  app.component("TooltipIf", TooltipIf);

  app.component("WrapperPage", WrapperPage);
}
