import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { MainRadialMenu } from "@/components/radial-menu/MainRadialMenu";
import ActionBar from "@/components/actionBar";

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="max-w-[1024px]">
          <div className="">
            <Outlet />
          </div>
          <TanStackRouterDevtools />
          <div className="fixed bottom-7 right-4">
            <MainRadialMenu />
          </div>
          <ActionBar />
        </div>
      </div>
    );
  },
});
