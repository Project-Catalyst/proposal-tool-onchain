import { ModalProgrammatic } from "@oruga-ui/oruga-next";
import { h } from "vue";

import WrapperModal from "@/components/layout/WrapperModal.vue";
import { mix } from "@/utils";

const defaultModalOptions = {
  Wrapper: WrapperModal,
  title: "Info",
  props: {},
  wrapperProps: {},
};

export default function useModal() {
  function openComponent(Component, options = {}) {
    const { props, title, wrapperProps, Wrapper } = mix(defaultModalOptions, options);

    const WrappedComponent = h(Wrapper, mix({ title }, wrapperProps), {
      default: () => h(Component, props),
    });

    ModalProgrammatic.open({
      component: WrappedComponent,
      trapFocus: true,
    });
  }

  return {
    openComponent,
  };
}
