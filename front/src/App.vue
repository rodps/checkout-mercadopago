<script setup lang="ts">
import FormPagamento from '@/components/FormPagamento.vue'
</script>

<template>
  <Suspense>
    <FormPagamento />
    <template #fallback> Carregando... </template>
  </Suspense>
</template>
