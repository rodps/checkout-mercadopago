<script setup lang="ts">
import FormPagamentoCartao from "@/components/FormPagamentoCartao.vue";
import FormPagamentoPix from "./components/FormPagamentoPix.vue";
import FormPagamentoBoleto from "./components/FormPagamentoBoleto.vue";
import CreditCardIcon from "@/components/icons/CreditCardIcon.vue";
import PixIcon from "@/components/icons/PixIcon.vue";
import BoletoIcon from "@/components/icons/BoletoIcon.vue";
import { ref } from "vue";

const formaPagamento = ref<string>("cartao");
</script>

<template>
  <main class="max-w-2xl mx-auto py-5 mb-10">
    <h1 class="text-3xl font-bold mb-3">Pagamento</h1>
    <div class="border p-3 rounded mb-5 text-end">
      <h3 class="font-bold mb-3">Resumo da compra</h3>
      <p>Subtotal: R$ 100,00</p>
      <p>Frete: R$ 0,00</p>
      <p>Desconto: R$ 0,00</p>
      <p>Valor total: R$ 100,00</p>
    </div>
    <p class="mb-3">Selecione a forma de pagamento:</p>
    <div class="grid grid-cols-3 gap-3 rounded mb-5">
      <div
        class="flex flex-col items-center border p-3 rounded cursor-pointer hover:border-blue-300 hover:shadow hover:bg-blue-100"
        :class="{
          'border-blue-300 shadow bg-blue-100': formaPagamento === 'cartao',
        }"
        @click="formaPagamento = 'cartao'"
      >
        <CreditCardIcon class="w-10" />
        <p>Cartão de crédito</p>
      </div>
      <div
        class="flex flex-col items-center border p-3 rounded cursor-pointer hover:border-blue-300 hover:shadow hover:bg-blue-100"
        :class="{
          'border-blue-300 shadow bg-blue-100': formaPagamento === 'pix',
        }"
        @click="formaPagamento = 'pix'"
      >
        <PixIcon class="w-10" />
        <p>Pix</p>
      </div>
      <div
        class="flex flex-col items-center border p-3 rounded cursor-pointer hover:border-blue-300 hover:shadow hover:bg-blue-100"
        :class="{
          'border-blue-300 shadow bg-blue-100': formaPagamento === 'boleto',
        }"
        @click="formaPagamento = 'boleto'"
      >
        <BoletoIcon class="w-10" />
        <p>Boleto</p>
      </div>
    </div>
    <Suspense v-if="formaPagamento === 'cartao'">
      <FormPagamentoCartao />
      <template #fallback> Carregando... </template>
    </Suspense>
    <Suspense v-if="formaPagamento === 'pix'">
      <FormPagamentoPix />
      <template #fallback> Carregando... </template>
    </Suspense>
    <Suspense v-if="formaPagamento === 'boleto'">
      <FormPagamentoBoleto />
      <template #fallback> Carregando... </template>
    </Suspense>
  </main>
</template>
