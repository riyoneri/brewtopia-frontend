import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD, QUERY_KEYS } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCategory() {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    ResponseData,
    ResponseError,
    string
  >({
    mutationFn: (categoryId: string) =>
      fetcher({
        url: `/admin/categories/${categoryId}`,
        method: FETCH_METHOD.DELETE,
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_CATEGORIES] });
    },
  });

  return {
    isPending,
    mutate,
    error,
    data,
  };
}
