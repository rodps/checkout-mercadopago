<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { getDocumentTypes } from "@/lib/mercadopago";

await loadMercadoPago();
const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

const qrCodeBase64 = ref<string>("");
const qrCode = ref<string>("");
const ticketUrl = ref<string>("");

onMounted(() => {
  getDocumentTypes(mp);
});

const onSubmit = (ev: Event) => {
  ev.preventDefault();
  const formData = new FormData(ev.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  console.log("Submit");
  const body = {
    description: data.description,
    transaction_amount: Number(data.transactionAmount),
    payment_method_id: "pix",
    payer: {
      email: data.email,
      first_name: data.payerFirstName,
      last_name: data.payerLastName,
      identification: {
        type: data.identificationType,
        number: data.identificationNumber,
      },
    },
  };
  fetch(`${import.meta.env.VITE_BACKEND_URL}/process_payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      qrCodeBase64.value =
        res.point_of_interaction.transaction_data.qr_code_base64;
      qrCode.value = res.point_of_interaction.transaction_data.qr_code;
      ticketUrl.value = res.point_of_interaction.transaction_data.ticket_url;
    });
};
</script>

<template>
  <form id="form-checkout" @submit="onSubmit">
    <div>
      <div>
        <label for="payerFirstName">Nome</label>
        <input
          id="form-checkout__payerFirstName"
          name="payerFirstName"
          type="text"
        />
      </div>
      <div>
        <label for="payerLastName">Sobrenome</label>
        <input
          id="form-checkout__payerLastName"
          name="payerLastName"
          type="text"
        />
      </div>
      <div>
        <label for="email">E-mail</label>
        <input id="form-checkout__email" name="email" type="text" />
      </div>
      <div>
        <label for="identificationType">Tipo de documento</label>
        <select
          id="form-checkout__identificationType"
          name="identificationType"
          type="text"
        ></select>
      </div>
      <div>
        <label for="identificationNumber">Número do documento</label>
        <input
          id="form-checkout__identificationNumber"
          name="identificationNumber"
          type="text"
        />
      </div>
    </div>

    <div>
      <div>
        <input
          type="hidden"
          name="transactionAmount"
          id="transactionAmount"
          value="100"
        />
        <input
          type="hidden"
          name="description"
          id="description"
          value="Nome do Produto"
        />
        <br />
        <button type="submit">Pagar</button>
      </div>
    </div>
  </form>

  <div class="qrcode-container" v-if="qrCode">
    <img
      class="qrcode-img"
      :src="`data:image/png;base64, ${qrCodeBase64}`"
      alt="QrCode"
    />
    <input type="text" :value="qrCode" readonly />
    <a :href="ticketUrl" target="_blank">Link externo</a>
  </div>
</template>

<style>
.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.qrcode-img {
  max-width: 200px;
}
</style>
