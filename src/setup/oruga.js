import {
  Config,
  OButton,
  OCheckbox,
  ODropdown,
  ODropdownItem,
  OField,
  OIcon,
  OInput,
  OLoading,
  OModal,
  ONotification,
  OSelect,
  OSlider,
  OTable,
  OTableColumn,
  OTooltip,
} from "@oruga-ui/oruga-next";
import { bulmaConfig } from "@oruga-ui/theme-bulma";

export default function setupOruga(app) {
  app.component("OButton", OButton);
  app.component("OCheckbox", OCheckbox);
  app.component("ODropdown", ODropdown);
  app.component("ODropdownItem", ODropdownItem);
  app.component("OField", OField);
  app.component("OIcon", OIcon);
  app.component("OInput", OInput);
  app.component("OLoading", OLoading);
  app.component("OModal", OModal);
  app.component("ONotification", ONotification);
  app.component("OSelect", OSelect);
  app.component("OSlider", OSlider);
  app.component("OTable", OTable);
  app.component("OTableColumn", OTableColumn);
  app.component("OTooltip", OTooltip);
  app.use(Config, { ...bulmaConfig, iconPack: "fas" });
}
