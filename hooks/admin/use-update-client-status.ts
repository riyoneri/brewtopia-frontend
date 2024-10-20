import { fetcher } from "@/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";

interface UpdateClientVariables {
  id: string;
  body: string;
}

export default function useAdminUpdateClientStatus() {
  const { isPending, mutate, error, data } = useMutation<
    SimplifiedResponse,
    FetcherResponse,
    UpdateClientVariables
  >({
    mutationFn: ({ id, body }) =>
      fetcher({
        url: `/admin/clients/${id}/status`,
        body,
        method: "POST",
      }),
  });

  return { isPending, mutate, error, data };
}
