import axiosClient from "@/lib/axios";
import { ref } from "vue";

export function useProcessPayment({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}) {
  const isLoading = ref(false);
  const processPayment = (body: any) => {
    isLoading.value = true;
    axiosClient
      .post("/process_payment", body)
      .then((res) => {
        onSuccess(res.data);
        isLoading.value = false;
      })
      .catch((err) => {
        isLoading.value = false;
        if (err.response) {
          onError(err.response.data.message);
        } else if (err.request) {
          onError(
            "Sem resposta do servidor. Por favor, tente novamente mais tarde."
          );
        } else {
          onError(
            "Erro interno do servidor. Por favor, entre em contato com o suporte"
          );
        }
      });
  };

  return { isLoading, processPayment };
}
