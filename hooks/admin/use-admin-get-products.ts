import { fetcher } from "@/helpers/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProducts(
  page: number = 1,
  limit: number = 5,
  hasLimit: boolean = true,
) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    { products: ProductDto[]; total: number }
  >({
    queryFn: () =>
      fetcher({
        url: `/admin/products?page=${hasLimit ? page : undefined}&limit=${hasLimit ? limit : undefined}`,
      }),
    queryKey: ["products", page, limit, hasLimit],
  });

  return {
    getAllProductsData: data,
    getAllProductsLoading: isLoading,
    getAllProductsError: error,
    getAllProductsRefetch: refetch,
  };
}
