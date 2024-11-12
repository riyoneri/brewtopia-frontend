import { fetcher } from "@/helpers/fetcher";
import { QUERY_KEYS } from "@/utils/constants/enums";
import { useQuery } from "@tanstack/react-query";

export function useAdminGetAllProducts(
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
    queryKey: [QUERY_KEYS.ALL_PRODUCTS, page, limit, hasLimit],
  });

  return {
    getAllProductsData: data,
    getAllProductsLoading: isLoading,
    getAllProductsError: error,
    getAllProductsRefetch: refetch,
  };
}
