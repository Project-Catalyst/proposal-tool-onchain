import { markRaw } from "vue";

import FieldCheckbox from "@/components/common/formFields/FieldCheckbox.vue";
import FieldDatepicker from "@/components/common/formFields/FieldDatepicker.vue";
import FieldInput from "@/components/common/formFields/FieldInput.vue";
import FieldNumber from "@/components/common/formFields/FieldNumber.vue";
import FieldRange from "@/components/common/formFields/FieldRange.vue";
import FieldSelect from "@/components/common/formFields/FieldSelect.vue";

markRaw(FieldCheckbox);
markRaw(FieldDatepicker);
markRaw(FieldInput);
markRaw(FieldNumber);
markRaw(FieldRange);
markRaw(FieldSelect);

const mapTypeComponent = {
  string: FieldInput,
  url: FieldInput,
  email: FieldInput,
  text: FieldInput,
  integer: FieldNumber,
  float: FieldNumber,
  decimal: FieldNumber,
  numrange: FieldRange,
  boolean: FieldCheckbox,
  date: FieldDatepicker,
};

const mapTypeComponentKeys = Object.keys(mapTypeComponent);

export default function getComponent(fieldDefinition) {
  const { type, meta } = fieldDefinition;

  if (type === "integer" || type === "float" || type === "decimal") {
    if (meta?.validValues) {
      return FieldSelect;
    }
  }

  if (mapTypeComponentKeys.includes(type)) {
    return mapTypeComponent[type];
  } else {
    throw new Error("Unknown field type");
  }
}
