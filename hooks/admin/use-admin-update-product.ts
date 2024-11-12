import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD, QUERY_KEYS } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminUpdateProduct<T>(productId: string) {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    ProductDto,
    ExtendedResponseError<T>,
    FormData
  >({
    mutationFn: (body) =>
      fetcher({
        url: `/admin/products/${productId}`,
        body,
        method: FETCH_METHOD.PATCH,
      }),
    onSuccess() {
      client.invalidateQueries({
        queryKey: [QUERY_KEYS.ALL_PRODUCTS, QUERY_KEYS.SINGLE_PRODUCT],
      });
    },
  });

  return {
    updateProductIsLoading: isPending,
    updateProductMutate: mutate,
    updateProductError: error,
    updateProductData: data,
  };
}
