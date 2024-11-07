import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD } from "@/utils/constants/enums";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyEmail<T>() {
  const { isPending, mutate, error, data } = useMutation<
    ResponseData,
    ExtendedResponseError<T>,
    string
  >({
    mutationFn: (body: string) =>
      fetcher({
        url: "/auth/verify-email",
        body,
        method: FETCH_METHOD.POST,
      }),
  });

  return { isPending, mutate, error, data };
}
