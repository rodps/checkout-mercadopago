<script setup lang="ts">
defineProps<{
  formaPagamento: string;
  label: string;
  value: string;
}>();

defineEmits<{
  (e: "update:formaPagamento", value: string): void;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center border p-3 rounded cursor-pointer hover:border-blue-300 hover:shadow hover:bg-blue-100"
    :class="{
      'border-blue-300 shadow bg-blue-100': formaPagamento === value,
    }"
    @click="$emit('update:formaPagamento', value)"
  >
    <slot name="icon"></slot>
    <p>{{ label }}</p>
  </div>
</template>
