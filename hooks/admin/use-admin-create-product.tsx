import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD } from "@/utils/constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAdminCreateProduct<T>() {
  const client = useQueryClient();
  const { isPending, mutate, error, data } = useMutation<
    ProductDto,
    ExtendedResponseError<T>,
    FormData
  >({
    mutationFn: (body) =>
      fetcher({
        url: `/admin/products`,
        body,
        method: FETCH_METHOD.POST,
      }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    createProductIsLoading: isPending,
    createProductMutate: mutate,
    createProductError: error,
    createProductData: data,
  };
}
