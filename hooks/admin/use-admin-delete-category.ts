import { fetcher } from "@/helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCategory(categoryId: string) {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    SimplifiedResponse,
    FetcherResponse,
    string
  >({
    mutationFn: () =>
      fetcher({
        url: `/admin/categories/${categoryId}`,
        method: "DELETE",
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    deleteCategoryIsLoading: isPending,
    deleteCategoryMutate: mutate,
    deleteCategoryError: error,
    deleteCategoryData: data,
  };
}
