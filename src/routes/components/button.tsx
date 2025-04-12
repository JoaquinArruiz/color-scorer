import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/components/button")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Button>asdasdsda</Button>
    </>
  );
}
