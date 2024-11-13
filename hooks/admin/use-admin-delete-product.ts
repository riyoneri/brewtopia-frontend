import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD, QUERY_KEYS } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminDeleteProduct() {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    ResponseData,
    ResponseError,
    string
  >({
    mutationFn: (productId: string) =>
      fetcher({
        url: `/admin/products/${productId}`,
        method: FETCH_METHOD.DELETE,
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_PRODUCTS] });
    },
  });

  return {
    isPending,
    mutate,
    error,
    data,
  };
}
