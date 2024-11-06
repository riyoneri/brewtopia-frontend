import { fetcher } from "@/helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateCategory<T>(categoryId: string) {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    SimplifiedResponse,
    GlobalResponseError<T>,
    string
  >({
    mutationFn: (body) =>
      fetcher({
        url: `/admin/categories/${categoryId}`,
        body,
        method: "PATCH",
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    updateCategoryIsLoading: isPending,
    updateCategoryMutate: mutate,
    updateCategoryError: error,
    updateCategoryData: data,
  };
}
