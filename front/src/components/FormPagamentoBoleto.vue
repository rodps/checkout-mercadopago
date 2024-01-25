<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { getDocumentTypes } from "@/lib/mercadopago";

await loadMercadoPago();
const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

const boleto = ref<string>("");

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
    payment_method_id: "bolbradesco",
    payer: {
      email: import.meta.env.VITE_PAYER_EMAIL,
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
      boleto.value = res.transaction_details.external_resource_url;
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

  <a :href="boleto" target="_blank" v-if="boleto">Imprimir boleto</a>
</template>
