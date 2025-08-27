import { rqClient } from "@/shared/api/instance";
import type { RefCallback } from "react";
import { useCallback } from "react";

type UseBoardsListParams = {
  limit?: number;
  isFavorite?: boolean;
  sort?: "createdAt" | "updatedAt" | "lastOpenedAt" | "name";
  search?: string;
};

export function useBoardsList({
  limit = 20,
  isFavorite,
  search,
  sort,
}: UseBoardsListParams) {
  const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } =
    rqClient.useInfiniteQuery(
      "get",
      "/boards",
      {
        params: {
          query: {
            page: 1,
            limit,
            isFavorite,
            search,
            sort,
          },
        },
      },
      {
        initialPageParam: 1,
        pageParamName: "page",
        getNextPageParam: (lastPage, _, lastPageParams) =>
          Number(lastPageParams) < (lastPage?.totalPages || 0)
            ? Number(lastPageParams) + 1
            : null,
      },
    );

  const cursorRef: RefCallback<HTMLDivElement> = useCallback(
    (el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 },
      );

      if (el) {
        observer.observe(el);

        return () => {
          observer.disconnect();
        };
      }
    },
    [fetchNextPage],
  );

  const boards = data?.pages.flatMap((page) => page.list) || [];

  return {
    boards,
    cursorRef,
    isFetchingNextPage,
    isPending,
    hasNextPage,
  };
}
