import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD, QUERY_KEYS } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminCreateCategory<T>() {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    ResponseData,
    ExtendedResponseError<T>,
    string
  >({
    mutationFn: (body) =>
      fetcher({
        url: "/admin/categories",
        body,
        method: FETCH_METHOD.POST,
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_CATEGORIES] });
    },
  });

  return {
    createCategoryIsLoading: isPending,
    createCategoryMutate: mutate,
    createCategoryError: error,
    createCategoryData: data,
  };
}
