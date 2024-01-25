<script setup lang="ts">
import FormPagamentoCartao from "@/components/FormPagamentoCartao.vue";
import FormPagamentoPix from "./components/FormPagamentoPix.vue";

declare global {
  interface Window {
    MercadoPago: any;
  }
}
</script>

<template>
  <Suspense>
    <FormPagamentoPix />
    <template #fallback> Carregando... </template>
  </Suspense>
</template>
