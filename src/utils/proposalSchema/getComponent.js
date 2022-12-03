import { markRaw } from "vue";

import FieldCheckbox from "@/components/common/formFields/FieldCheckbox.vue";
import FieldDatepicker from "@/components/common/formFields/FieldDatepicker.vue";
import FieldHtml from "@/components/common/formFields/FieldHtml.vue";
import FieldInput from "@/components/common/formFields/FieldInput.vue";
import FieldNumber from "@/components/common/formFields/FieldNumber.vue";
import FieldRange from "@/components/common/formFields/FieldRange.vue";
import FieldSelect from "@/components/common/formFields/FieldSelect.vue";
import FieldUpload from "@/components/common/formFields/FieldUpload.vue";

markRaw(FieldCheckbox);
markRaw(FieldDatepicker);
markRaw(FieldHtml);
markRaw(FieldInput);
markRaw(FieldNumber);
markRaw(FieldRange);
markRaw(FieldSelect);
markRaw(FieldUpload);

const mapTypeComponent = {
  string: FieldInput,
  url: FieldInput,
  email: FieldInput,
  text: FieldInput,
  html: FieldHtml,
  integer: FieldNumber,
  float: FieldNumber,
  decimal: FieldNumber,
  numrange: FieldRange,
  boolean: FieldCheckbox,
  date: FieldDatepicker,
  daterange: FieldDatepicker,
  file: FieldUpload,
};

const mapTypeComponentKeys = Object.keys(mapTypeComponent);

export default function getComponent(fieldDefinition) {
  const { type, meta } = fieldDefinition;

  if (type === "string" || type === "integer" || type === "float" || type === "decimal") {
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
