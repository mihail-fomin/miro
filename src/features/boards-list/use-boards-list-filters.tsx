import { useState } from "react";

export type BoardsListFilters = {
    search: string;
    sort: BoardsSortOption;
}

export type BoardsSortOption = "createdAt" | "updatedAt" | "lastOpenedAt" | "name";

export function useBoardsListFilters() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<BoardsSortOption>("lastOpenedAt");

    return {
        search,
        sort,
        setSearch,
        setSort,
    }
}