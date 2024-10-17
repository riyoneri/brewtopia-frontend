import { fetcher } from "@/helpers/fetcher";
import handleFetchRedirect from "@/helpers/handle-fetch-redirect";
import { useQuery } from "@tanstack/react-query";

export function useListClients(page: number = 1, limit: number = 5) {
  const { data, isLoading, error, refetch } = useQuery<
    unknown,
    FetcherResponse,
    { users: UserDto[]; total: number }
  >({
    queryFn: () =>
      fetcher({ url: `/admin/clients?page=${page}&limit=${limit}` }),
    queryKey: ["clients", page, limit],
  });

  if (error?.statusCode === 401) {
    handleFetchRedirect("admin");
  }

  return { data, isLoading, error, refetch };
}
