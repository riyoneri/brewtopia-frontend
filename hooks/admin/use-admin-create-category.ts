import { fetcher } from "@/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";

export default function useAdminCreateCategory<T>() {
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
  });

  return {
    createCategoryIsLoading: isPending,
    createCategoryMutate: mutate,
    createCategoryError: error,
    createCategoryData: data,
  };
}
