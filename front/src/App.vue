<script setup lang="ts">
import FormPagamentoCartao from "@/components/FormPagamentoCartao.vue";
import FormPagamentoPix from "./components/FormPagamentoPix.vue";
import Pagamentos from "./components/Pagamentos.vue";
import FormPagamentoBoleto from "./components/FormPagamentoBoleto.vue";

declare global {
  interface Window {
    MercadoPago: any;
  }
}
</script>

<template>
  <Suspense>
    <FormPagamentoBoleto />
    <template #fallback> Carregando... </template>
  </Suspense>
</template>
