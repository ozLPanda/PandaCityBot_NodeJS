<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  column: {
    type: Boolean,
    default: false
  },
  gap: {
    type: Number,
    default: 5
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '150px'
  },
  inputClass:{
    type: String,
    default: ''
  },
  modelValue: null
})

let value = ref(null)
const emits = defineEmits(['update:modelValue'])

watch(value, (val) => {
  emits('update:modelValue', value.value)
})
</script>

<template>
  <div :class="[{ block__column: column }]" :style="[{gap: gap+'px'}]">
    <label>{{ title }}</label>
    <input :class="inputClass" :style="{ width: size }" v-model="value" :type="type" :placeholder="placeholder" />
  </div>
</template>

<style scoped>
.block__column {
  display: flex;
  flex-direction: column;
}

input {
  border-radius: 5px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  outline: none;
  transition: 0.3s all;
  font-size: 11pt;
  width: 100%;

  &:hover {
    border-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    border-color: var(--color-success);
  }
}
</style>
