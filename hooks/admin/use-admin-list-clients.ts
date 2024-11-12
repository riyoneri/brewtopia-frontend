import { fetcher } from "@/helpers/fetcher";
import { QUERY_KEYS } from "@/utils/constants/enums";
import { useQuery } from "@tanstack/react-query";

export function useAdminListClients(page: number = 1, limit: number = 5) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    ResponseError,
    { users: UserDto[]; total: number }
  >({
    queryFn: () =>
      fetcher({ url: `/admin/clients?page=${page}&limit=${limit}` }),
    queryKey: [QUERY_KEYS.ALL_CLIENTS, page, limit],
  });

  return { data, isLoading, error, refetch };
}
