import { fetcher } from "@/helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminCreateCategory<T>() {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    SimplifiedResponse,
    GlobalResponseError<T>,
    string
  >({
    mutationFn: (body) =>
      fetcher({
        url: `/admin/categories`,
        body,
        method: "POST",
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    createCategoryIsLoading: isPending,
    createCategoryMutate: mutate,
    createCategoryError: error,
    createCategoryData: data,
  };
}
