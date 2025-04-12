import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/components")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Hola</h1>
      <Outlet />
    </div>
  );
}
