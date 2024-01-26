<script setup lang="ts">
import SpinnerIcon from "./icons/SpinnerIcon.vue";

defineProps<{
  loading?: boolean;
  label: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    type="submit"
    id="form-checkout__submit"
    class="btn-primary flex justify-center items-center gap-3 w-full"
    @click="$emit('click')"
    :disabled="loading"
  >
    <SpinnerIcon v-if="loading" class="w-5 animate-spin" />
    {{ label }}
  </button>
</template>
