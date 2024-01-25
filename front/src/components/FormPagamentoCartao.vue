<script setup lang="ts">
import { onMounted } from "vue";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { loadCardForm } from "@/lib/mercadopago";

await loadMercadoPago();
const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

onMounted(() => {
  loadCardForm(mp);
});
</script>

<template>
  <div class="page">
    <h1>Pagamento</h1>
    <form id="form-checkout">
      <div id="form-checkout__cardNumber" class="container"></div>
      <div id="form-checkout__expirationDate" class="container"></div>
      <div id="form-checkout__securityCode" class="container"></div>
      <input type="text" id="form-checkout__cardholderName" />
      <select id="form-checkout__issuer"></select>
      <select id="form-checkout__installments"></select>
      <select id="form-checkout__identificationType"></select>
      <input type="text" id="form-checkout__identificationNumber" />
      <input type="email" id="form-checkout__cardholderEmail" />

      <button type="submit" id="form-checkout__submit">Pagar</button>
      <progress value="0" class="progress-bar">Carregando...</progress>
    </form>
  </div>
</template>

<style>
#form-checkout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container {
  height: 18px;
  display: inline-block;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  padding: 1px 2px;
}

.page {
  margin: 0 auto;
  max-width: 600px;
}
</style>
