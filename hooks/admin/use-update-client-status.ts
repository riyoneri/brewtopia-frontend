import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD } from "@/utils/constants/enums";
import { useMutation } from "@tanstack/react-query";

interface UpdateClientVariables {
  id: string;
  body: string;
}

export default function useAdminUpdateClientStatus() {
  const { isPending, mutate, error, data } = useMutation<
    ResponseData,
    ResponseError,
    UpdateClientVariables
  >({
    mutationFn: ({ id, body }) =>
      fetcher({
        url: `/admin/clients/${id}/status`,
        body,
        method: FETCH_METHOD.PATCH,
      }),
  });

  return { isPending, mutate, error, data };
}
