import { fetcher } from "@/helpers/fetcher";
import { QUERY_KEYS } from "@/utils/constants/enums";
import { useQuery } from "@tanstack/react-query";

export function useAdminGetSingleCategory(categoryId: string) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    CategoryDto
  >({
    queryFn: () =>
      fetcher({
        url: `/admin/categories/${categoryId}`,
      }),
    queryKey: [QUERY_KEYS.SINGLE_CATEGORY, categoryId],
  });

  return {
    getSingleCategoryData: data,
    getSingleCategoryLoading: isLoading,
    getSingleCategoryError: error,
    getSingleCategoryRefetch: refetch,
  };
}
