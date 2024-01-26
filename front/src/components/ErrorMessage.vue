<script setup lang="ts">
defineProps<{
  error?: string;
}>();
</script>

<template>
  <div
    class="text-red-500 my-3 bg-red-100 p-3 rounded text-center"
    v-if="error"
  >
    <p class="mb-3">
      Houve um erro ao processar o pagamento. Tente novamente mais tarde ou
      entre em contato com o suporte.
    </p>
    <p>Detalhes: {{ error }}</p>
  </div>
</template>
