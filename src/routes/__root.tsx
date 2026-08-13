import { Outlet, createRootRoute } from "@tanstack/react-router";

import { MainRadialMenu } from "@/components/radial-menu/MainRadialMenu";
import ActionBar from "@/components/actionBar";
import Sidebar from "@/components/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Sidebar />

      <main className="pb-28 lg:pb-0 lg:pl-72">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>

      <div className="lg:hidden">
        <div className="fixed right-4 bottom-7">
          <MainRadialMenu />
        </div>
        <ActionBar />
      </div>
    </div>
  ),
});
