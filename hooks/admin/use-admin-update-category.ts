import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD, QUERY_KEYS } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminUpdateCategory<T>(categoryId: string) {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    ResponseData,
    ExtendedResponseError<T>,
    string
  >({
    mutationFn: (body) =>
      fetcher({
        url: `/admin/categories/${categoryId}`,
        body,
        method: FETCH_METHOD.PATCH,
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_CATEGORIES] });
    },
  });

  return {
    updateCategoryIsLoading: isPending,
    updateCategoryMutate: mutate,
    updateCategoryError: error,
    updateCategoryData: data,
  };
}
