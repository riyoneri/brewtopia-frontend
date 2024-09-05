import { fetcher } from "@/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";

export default function useRegisterAdmin<T>() {
  const { isPending, mutate, error, data } = useMutation<
    AdminDto,
    GlobalResponseError<T>,
    string
  >({
    mutationFn: (body: string) =>
      fetcher({ url: "/admin/auth/register", body, method: "POST" }),
  });

  return { isPending, mutate, error, data };
}
