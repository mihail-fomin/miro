import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Outlet />
    </div>
  );
}
