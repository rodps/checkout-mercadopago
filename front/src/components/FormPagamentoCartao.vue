<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { mountCardForm } from "@/lib/mercadopago";

let cardform: any = null;

onMounted(async () => {
  cardform = await mountCardForm();
});

onUnmounted(() => {
  cardform.unmount();
});
</script>

<template>
  <form id="form-checkout" class="flex flex-col">
    <div id="form-checkout__cardNumber" class="input"></div>
    <div id="form-checkout__expirationDate" class="input"></div>
    <div id="form-checkout__securityCode" class="input"></div>
    <input type="text" id="form-checkout__cardholderName" class="input" />
    <select id="form-checkout__issuer" class="input"></select>
    <select id="form-checkout__installments" class="input"></select>
    <select id="form-checkout__identificationType" class="input"></select>
    <input type="text" id="form-checkout__identificationNumber" class="input" />
    <input type="email" id="form-checkout__cardholderEmail" class="input" />

    <button type="submit" id="form-checkout__submit" class="btn-primary">
      Pagar
    </button>
    <!-- <progress value="0" class="w-full">Carregando...</progress> -->
  </form>
</template>
