import { fetcher } from "@/helpers/fetcher";
import { QUERY_KEYS } from "@/utils/constants/enums";
import { useQuery } from "@tanstack/react-query";

export function useAdminGetSingleProduct(productId: string) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    SimpleProductDto
  >({
    queryFn: () =>
      fetcher({
        url: `/admin/products/${productId}`,
      }),
    queryKey: [QUERY_KEYS.SINGLE_PRODUCT, productId],
  });

  return {
    getSingleProductData: data,
    getSingleProductLoading: isLoading,
    getSingleProductError: error,
    getSingleProductRefetch: refetch,
  };
}
