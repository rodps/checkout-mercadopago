<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDocumentTypes } from "@/lib/mercadopago";
import Button from "./Button.vue";
import { useProcessPayment } from "@/composables/useProcessPayment";
import ErrorMessage from "./ErrorMessage.vue";

const boleto = ref<string>("");
const error = ref<string>("");

const { processPayment, isLoading } = useProcessPayment({
  onSuccess: (data) => {
    boleto.value = data.transaction_details.external_resource_url;
  },
  onError: (err) => {
    error.value = err;
  },
});

onMounted(() => {
  getDocumentTypes();
});

const onSubmit = (ev: Event) => {
  ev.preventDefault();
  const formData = new FormData(ev.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  processPayment({
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
  });
};
</script>

<template>
  <form id="form-checkout" @submit="onSubmit" class="flex flex-col">
    <input
      id="form-checkout__payerFirstName"
      name="payerFirstName"
      type="text"
      class="input"
      placeholder="Nome"
    />
    <input
      id="form-checkout__payerLastName"
      name="payerLastName"
      type="text"
      class="input"
      placeholder="Sobrenome"
    />
    <select
      id="form-checkout__identificationType"
      name="identificationType"
      type="text"
      class="input"
      placeholder="Tipo de documento"
    ></select>
    <input
      id="form-checkout__identificationNumber"
      name="identificationNumber"
      type="text"
      class="input"
      placeholder="Número do documento"
    />

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

    <ErrorMessage :error="error" />

    <Button label="Gerar boleto" :loading="isLoading" />
  </form>

  <a :href="boleto" target="_blank" v-if="boleto">Imprimir boleto</a>
</template>
