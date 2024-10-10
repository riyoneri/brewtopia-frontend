import { fetcher } from "@/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";

export default function useRequestVerificationEmail<T>() {
  const { isPending, mutate, error, data } = useMutation<
    SimplifiedResponse,
    GlobalResponseError<T>,
    string
  >({
    mutationFn: (body: string) =>
      fetcher({
        url: "/auth/resend-verification-email",
        body,
        method: "POST",
      }),
  });

  return { isPending, mutate, error, data };
}