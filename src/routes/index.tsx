import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <div>asd</div>
      <Link to="/components/button">Button</Link>
    </div>
  );
}
