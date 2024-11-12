import { fetcher } from "@/helpers/fetcher";
import { QUERY_KEYS } from "@/utils/constants/enums";
import { useQuery } from "@tanstack/react-query";

export function useAdminGetAllCategories(
  page: number = 1,
  limit: number = 5,
  hasLimit: boolean = true,
) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    { categories: CategoryDto[]; total: number }
  >({
    queryFn: () =>
      fetcher({
        url: `/admin/categories?page=${hasLimit ? page : undefined}&limit=${hasLimit ? limit : undefined}`,
      }),
    queryKey: [QUERY_KEYS.ALL_CATEGORIES, page, limit, hasLimit],
  });

  return {
    getAllCategoriesData: data,
    getAllCategoriesLoading: isLoading,
    getAllCategoriesError: error,
    getAllCategoriesRefetch: refetch,
  };
}
