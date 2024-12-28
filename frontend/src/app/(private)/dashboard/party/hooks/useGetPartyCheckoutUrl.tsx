import { AxiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

function useGetPartyCheckoutUrl() {
  const mutation = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const response = await AxiosInstance.post(
        `/payments/partyPaymentCheckoutUrl`,
        { productId },
        {
          withCredentials: true,
        }
      );

      return response.data.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {},
  });

  return mutation;
}

export default useGetPartyCheckoutUrl;
