import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../../api/songApi";

export function useSongs(currentPage, searchTerm, groupSelected, filters) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["songs", currentPage, searchTerm, groupSelected, filters],
    queryFn: () =>
      getSongs(groupSelected.id, currentPage, searchTerm, filters).then(
        (res) => res.data
      ),
    keepPreviousData: true,
  });

  return { data, isLoading, isError, error, refetch };
}
