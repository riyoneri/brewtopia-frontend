import { fetcher } from "@/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";

export default function useAdminResetPassword<T>() {
  const { isPending, mutate, error, data } = useMutation<
    SimplifiedResponse,
    GlobalResponseError<T>,
    string
  >({
    mutationFn: (body: string) =>
      fetcher({
        url: "/admin/auth/reset-password",
        body,
        method: "POST",
      }),
  });

  return { isPending, mutate, error, data };
}
