import { fetcher } from "@/helpers/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useGetSingleCategory(categoryId: string) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    CategoryDto
  >({
    queryFn: () =>
      fetcher({
        url: `/admin/categories/${categoryId}`,
      }),
    queryKey: ["category", categoryId],
  });

  return {
    getSingleCategoryData: data,
    getSingleCategoryLoading: isLoading,
    getSingleCategoryError: error,
    getSingleCategoryRefetch: refetch,
  };
}
