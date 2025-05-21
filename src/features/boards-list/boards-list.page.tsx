import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";
import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";

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
    <div className="container mx-auto p-4">
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

      <div className="grid grid-cols-3 gap-4">
        {boardsQuery.data?.map((board) => (
          <Card key={board.id}>
            <CardHeader>
              <Button variant="link" asChild>
                <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                  {board.name}
                </Link>
              </Button>
            </CardHeader>
            <CardFooter>
              <Button
                variant="destructive"
                disabled={deleteBoardMutation.isPending}
                onClick={() =>
                  deleteBoardMutation.mutate({
                    params: { path: { boardId: board.id } },
                  })
                }
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
