import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD, QUERY_KEYS } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminCreatePromotion<T>() {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    object,
    ExtendedResponseError<T>,
    string
  >({
    mutationFn: (body) =>
      fetcher({
        url: "/admin/promotions",
        body,
        method: FETCH_METHOD.POST,
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_PROMOTIONS] });
    },
  });

  return {
    createPromotionIsLoading: isPending,
    createPromotionMutate: mutate,
    createPromotionError: error,
    createPromotionData: data,
  };
}
