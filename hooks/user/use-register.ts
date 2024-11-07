import { fetcher } from "@/helpers/fetcher";
import { FETCH_METHOD } from "@/utils/constants/enums";
import { useMutation } from "@tanstack/react-query";

export default function useRegister<T>() {
  const { isPending, mutate, error, data } = useMutation<
    UserDto,
    ExtendedResponseError<T>,
    string
  >({
    mutationFn: (body: string) =>
      fetcher({ url: "/auth/register", body, method: FETCH_METHOD.POST }),
  });

  return { isPending, mutate, error, data };
}
