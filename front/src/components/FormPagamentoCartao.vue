<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import { useCardForm } from "@/composables/useCardForm";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const error = ref<string>("");

const { isFetching } = useCardForm({
  onSuccess: () => {
    emit("success");
  },
  onError: (err) => {
    error.value = err;
  },
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

    <div
      class="text-red-500 my-3 bg-red-100 p-3 rounded text-center"
      v-if="error"
    >
      <p class="mb-3">
        Houve um erro ao processar o pagamento. Tente novamente mais tarde ou
        entre em contato com o suporte.
      </p>
      <p>Detalhes: {{ error }}</p>
    </div>
    <Button label="Pagar" :loading="isFetching" />
  </form>
</template>
