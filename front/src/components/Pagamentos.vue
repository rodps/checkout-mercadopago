<script setup lang="ts">
import { ref } from "vue";

const payments = ref<any[]>([]);
await fetch(`${import.meta.env.VITE_BACKEND_URL}/payments`)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    payments.value = res.results;
  });
</script>

<template>
  <h1>Pagamentos</h1>
  <ul>
    <li v-for="payment in payments" :key="payment.id">
      <p>id: {{ payment.id }}</p>
      <p>description: {{ payment.description }}</p>
      <p>status: {{ payment.status }}</p>
      <p>status detail: {{ payment.status_detail }}</p>
      <p>amount: {{ payment.transaction_amount }}</p>
      <p>date created: {{ payment.date_created }}</p>
      <p>method: {{ payment.payment_method_id }}</p>
      <p>type: {{ payment.payment_type_id }}</p>
    </li>
  </ul>
</template>
