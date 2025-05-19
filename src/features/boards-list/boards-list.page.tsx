import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";
import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";

function BoardsListPage() {
  const boardsQuery = rqClient.useQuery("get", "/boards");

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
      },
    },
  );

  return (
    <div>
      <h1>Boards list</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);

          createBoardMutation.mutate({
            body: { name: formData.get("name") as string },
          });
        }}
      >
        <input type="text" name="name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          {createBoardMutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      {boardsQuery.data?.map((board) => (
        <div key={board.id}>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
          <button
            disabled={deleteBoardMutation.isPending}
            onClick={() =>
              deleteBoardMutation.mutate({
                params: { path: { boardId: board.id } },
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export const Component = BoardsListPage;
