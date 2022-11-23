import { NotificationProgrammatic } from "@oruga-ui/oruga-next";

import { mix } from "@/utils";

const defaultNotificationOptions = {
  duration: 5000,
  position: "top",
  variant: "primary",
  closable: true,
};

export default function useNotifications() {
  function open(message = "", options = {}) {
    let _message = message;
    if (Array.isArray(message)) {
      _message = message.join("<br>");
    }
    const opts = mix(defaultNotificationOptions, { message: _message }, options);
    NotificationProgrammatic.open(opts);
  }

  function info(message = "", options = {}) {
    const opts = mix(
      {
        variant: "info",
        hasIcon: true,
        iconPack: "fas",
        icon: "circle-info",
      },
      options,
    );
    open(message, opts);
  }

  function warning(message = "", options = {}) {
    const opts = mix(
      {
        variant: "warning",
        hasIcon: true,
        iconPack: "fas",
        icon: "circle-exclamation",
      },
      options,
    );
    open(message, opts);
  }

  function success(message = "Done!", options = {}) {
    const opts = mix(
      {
        variant: "success",
        hasIcon: true,
        iconPack: "fas",
        icon: "circle-check",
      },
      options,
    );
    open(message, opts);
  }

  function danger(message = "Error!", options = {}) {
    const opts = mix(
      {
        variant: "danger",
        hasIcon: true,
        iconPack: "fas",
        icon: "circle-xmark",
      },
      options,
    );
    open(message, opts);
  }

  function closeAll() {
    NotificationProgrammatic.closeAll();
  }

  return {
    info,
    success,
    warning,
    danger,

    open,
    closeAll,
  };
}
