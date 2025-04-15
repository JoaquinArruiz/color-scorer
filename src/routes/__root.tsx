import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { MainRadialMenu } from "@/components/radial-menu/MainRadialMenu";
import ActionBar from "@/components/actionBar";
import { useColorStore } from "@/store/colorStore";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";

export const Route = createRootRoute({
  component: () => {
    const { color2 } = useColorStore();
    const backgroundColor = useBackgroundColor(color2);

    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{
          backgroundColor,
          transition: "background-color 0.3s ease",
          minHeight: "100vh",
        }}
      >
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
