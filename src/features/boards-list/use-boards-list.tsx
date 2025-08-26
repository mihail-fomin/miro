import { rqClient } from "@/shared/api/instance";

type UseBoardsListParams = {
    limit?: number;
    isFavorite?: boolean;
    sort?: "createdAt" | "updatedAt" | "lastOpenedAt" | "name";
    search?: string;
}

export function useBoardsList({
    limit = 20,
    isFavorite,
    search,
    sort,
}: UseBoardsListParams) {

    const boardsListQuery = rqClient.useInfiniteQuery(
        'get',
        '/boards',
        {
        params: {
            query: {
                page: 1,
                limit,
                isFavorite,
                search,
                sort,
            }
        },
    }, {
        initialPageParam: 1,
        pageParamName: 'page',
        getNextPageParam: (lastPage, _, lastPageParams) =>
            Number(lastPageParams) < (lastPage?.totalPages || 0)
                ? Number(lastPageParams) + 1
                : null,
    })

    console.log('boardsListQuery: ', boardsListQuery.data);

}