import { loadMercadoPago } from "@mercadopago/sdk-js";
import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
import { useProcessPayment } from "./useProcessPayment";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

await loadMercadoPago();
const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

export function useCardForm({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}) {
  const { processPayment, isLoading } = useProcessPayment({
    onSuccess,
    onError,
  })

  let cardForm: any;

  onMounted(() => {
    cardForm = mountCardForm();
  });

  onUnmounted(() => {
    cardForm.unmount();
  });

  const mountCardForm = () => {
    const cardForm = mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error)
            return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: (event: any) => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          processPayment({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Descrição do produto",
            payer: {
              email: import.meta.env.VITE_PAYER_EMAIL,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          });
        },
        onError: (error: any) => {
          onError(error);
        }
      },
    });
    return cardForm;
  };

  return { isLoading };
}
