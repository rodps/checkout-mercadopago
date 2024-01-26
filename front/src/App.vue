<script setup lang="ts">
import FormPagamentoCartao from "@/components/FormPagamentoCartao.vue";
import FormPagamentoPix from "./components/FormPagamentoPix.vue";
import FormPagamentoBoleto from "./components/FormPagamentoBoleto.vue";
import CreditCardIcon from "@/components/icons/CreditCardIcon.vue";
import PixIcon from "@/components/icons/PixIcon.vue";
import BoletoIcon from "@/components/icons/BoletoIcon.vue";
import { ref } from "vue";
import OptionFormaPagamento from "./components/OptionFormaPagamento.vue";
import PagamentoSucessoCartao from "./components/PagamentoSucessoCartao.vue";

const formaPagamento = ref<string>("cartao");
const pagamentoSucesso = ref<boolean>(false);
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

    <div v-if="!pagamentoSucesso">
      <p class="mb-3">Selecione a forma de pagamento:</p>
      <div class="grid grid-cols-3 gap-3 rounded mb-5">
        <OptionFormaPagamento
          :formaPagamento="formaPagamento"
          :label="'Cartão de Credito'"
          value="cartao"
          @update:forma-pagamento="formaPagamento = $event"
        >
          <template #icon>
            <CreditCardIcon class="w-10" />
          </template>
        </OptionFormaPagamento>
        <OptionFormaPagamento
          :formaPagamento="formaPagamento"
          label="Pix"
          value="pix"
          @update:forma-pagamento="formaPagamento = $event"
        >
          <template #icon>
            <PixIcon class="w-10" />
          </template>
        </OptionFormaPagamento>
        <OptionFormaPagamento
          :formaPagamento="formaPagamento"
          label="Boleto"
          value="boleto"
          @update:forma-pagamento="formaPagamento = $event"
        >
          <template #icon>
            <BoletoIcon class="w-10" />
          </template>
        </OptionFormaPagamento>
      </div>

      <Suspense v-if="formaPagamento === 'cartao'">
        <FormPagamentoCartao @success="() => (pagamentoSucesso = true)" />
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
    </div>
    <div v-else>
      <PagamentoSucessoCartao v-if="formaPagamento === 'cartao'" />
    </div>
  </main>
</template>
