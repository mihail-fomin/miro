import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useSession();

  console.log("session: ", session);
  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
