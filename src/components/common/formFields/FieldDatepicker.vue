<template>
  <field-wrapper
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <o-datepicker
      :id="props.uuid"
      v-model="value"
      expanded
      icon="calendar"
      :min-date="props.min"
      :max-date="props.max"
      :multiple="props.multiple"
      :editable="!props.multiple"
      :range="props.range"
      :focused-date="canSetToday ? new Date() : props.min || props.max"
      :selectable-dates="props.selectableDates"
      :placeholder="props.placeholder || 'Click to select...'"
      :readonly="props.readonly"
      :disabled="props.disabled"
      @keypress="onKeyPress"
    >
      <template #footer>
        <div class="buttons mb-0">
          <o-button
            v-if="canSetToday"
            variant="primary"
            @click="value = new Date()"
          >
            <o-icon icon="calendar" />

            <span>Today</span>
          </o-button>

          <o-button
            v-if="value && !props.required"
            variant="danger"
            @click="value = props.multiple ? [] : null"
          >
            <o-icon icon="times" />

            <span>Clear</span>
          </o-button>
        </div>
      </template>
    </o-datepicker>
  </field-wrapper>
</template>

<script setup>
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";

import FieldWrapper from "@/components/common/formFields/FieldWrapper.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  help: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: Object,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  uuid: {
    type: Number,
    default: 0,
  },
  default: {
    type: [Array, Date, null],
    default: null,
  },
  min: {
    type: Date,
    default: null,
  },
  max: {
    type: Date,
    default: null,
  },
  selectableDates: {
    type: Array,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  range: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Array, Date, null],
    default: null,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => value === null || Array.isArray(value) || value instanceof Date,
});

const value = ref(props.modelValue);

const canSetToday = computed(() => {
  const now = dayjs();
  if (props.min && props.max) {
    return now.isAfter(props.min) && now.isBefore(props.max);
  } else if (props.min) {
    return now.isAfter(props.min);
  } else if (props.max) {
    return now.isBefore(props.max);
  } else {
    return true;
  }
});

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(value, () => emit("update:modelValue", value.value));

function onKeyPress(e) {
  props.multiple && e.preventDefault();
}
</script>
