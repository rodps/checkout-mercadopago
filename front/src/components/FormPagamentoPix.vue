<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDocumentTypes } from "@/lib/mercadopago";
import Button from "./Button.vue";
import { useProcessPayment } from "@/composables/useProcessPayment";
import ErrorMessage from "./ErrorMessage.vue";

const qrCodeBase64 = ref<string>("");
const qrCode = ref<string>("");
const ticketUrl = ref<string>("");
const error = ref<string>("");

const { processPayment, isLoading } = useProcessPayment({
  onSuccess: (data) => {
    qrCodeBase64.value =
      data.point_of_interaction.transaction_data.qr_code_base64;
    qrCode.value = data.point_of_interaction.transaction_data.qr_code;
    ticketUrl.value = data.point_of_interaction.transaction_data.ticket_url;
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
    payment_method_id: "pix",
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

    <Button label="Gerar QR Code" :loading="isLoading" />
  </form>

  <div
    class="flex flex-col items-center justify-center gap-3 mt-5"
    v-if="qrCode"
  >
    <img
      class="max-w-52"
      :src="`data:image/png;base64, ${qrCodeBase64}`"
      alt="QrCode"
    />
    <input type="text" :value="qrCode" readonly class="input" />
    <a
      :href="ticketUrl"
      target="_blank"
      class="text-blue-500 underline hover:text-blue-700"
      >Link externo</a
    >
  </div>
</template>
