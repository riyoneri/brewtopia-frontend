import { fetcher } from "@/helpers/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleProduct(productId: string) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    SimpleProductDto
  >({
    queryFn: () =>
      fetcher({
        url: `/admin/products/${productId}`,
      }),
    queryKey: ["product", productId],
  });

  return {
    getSingleProductData: data,
    getSingleProductLoading: isLoading,
    getSingleProductError: error,
    getSingleProductRefetch: refetch,
  };
}
