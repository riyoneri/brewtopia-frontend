import { fetcher } from "@/helpers/fetcher";
import { useMutation } from "@tanstack/react-query";

export default function useRegister<T>() {
  const { isPending, mutate, error, data } = useMutation<
    UserDto,
    GlobalResponseError<T>,
    string
  >({
    mutationFn: (body: string) =>
      fetcher({ url: "/auth/register", body, method: "POST" }),
  });

  return { isPending, mutate, error, data };
}
