import { fetcher } from "@/helpers/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useListClients(page: number = 1, limit: number = 5) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    { users: UserDto[]; total: number }
  >({
    queryFn: () =>
      fetcher({ url: `/admin/clients?page=${page}&limit=${limit}` }),
    queryKey: ["clients", page, limit],
  });

  return { data, isLoading, error, refetch };
}
