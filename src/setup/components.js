import { QuillEditor } from "@vueup/vue-quill";

import ButtonDropdown from "@/components/common/ButtonDropdown.vue";
import ButtonsSave from "@/components/common/ButtonsSave.vue";
import ButtonTxSubmit from "@/components/common/ButtonTxSubmit.vue";
import IconLoading from "@/components/common/IconLoading.vue";
import TooltipIf from "@/components/common/TooltipIf.vue";
import VeeForm from "@/components/common/VeeForm.vue";
import WrapperPage from "@/components/layout/WrapperPage.vue";

export default function setupComponents(app) {
  app.component("QuillEditor", QuillEditor);

  app.component("ButtonDropdown", ButtonDropdown);
  app.component("ButtonsSave", ButtonsSave);
  app.component("ButtonTxSubmit", ButtonTxSubmit);
  app.component("IconLoading", IconLoading);
  app.component("TooltipIf", TooltipIf);
  app.component("VeeForm", VeeForm);

  app.component("WrapperPage", WrapperPage);
}
