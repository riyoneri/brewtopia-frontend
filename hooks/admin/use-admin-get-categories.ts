import { fetcher } from "@/helpers/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCategories(page: number = 1, limit: number = 5) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    FetcherResponse,
    { categories: CategoryDto[]; total: number }
  >({
    queryFn: () =>
      fetcher({ url: `/admin/categories?page=${page}&limit=${limit}` }),
    queryKey: ["categories", page, limit],
  });

  return {
    getAllCategoriesData: data,
    getAllCategoriesLoading: isLoading,
    getAllCategoriesError: error,
    getAllCategoriesRefetch: refetch,
  };
}
