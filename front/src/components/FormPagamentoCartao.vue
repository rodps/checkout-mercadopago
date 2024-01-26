<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import { useCardForm } from "@/composables/useCardForm";
import ErrorMessage from "./ErrorMessage.vue";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const error = ref<string>("");

const { isLoading } = useCardForm({
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

    <ErrorMessage :error="error" />

    <Button label="Pagar" :loading="isLoading" />
  </form>
</template>
