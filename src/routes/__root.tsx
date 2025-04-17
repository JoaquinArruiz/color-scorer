import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { MainRadialMenu } from "@/components/radial-menu/MainRadialMenu";
import ActionBar from "@/components/actionBar";
import { useColorStore } from "@/store/colorStore";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";
import { useOrientation } from "@/hooks/useOrientation";
import Sidebar from "@/components/Sidebar";

export const Route = createRootRoute({
  component: () => {
    const { color2 } = useColorStore();
    const backgroundColor = useBackgroundColor(color2);
    const orientation = useOrientation();
    const isLandscape = orientation === "landscape";

    return (
      <div
        className="flex min-h-screen"
        style={{
          backgroundColor,
          transition: "background-color 0.3s ease",
        }}
      >
        {isLandscape && <Sidebar />}

        <div
          className={`flex-1 flex flex-col items-center justify-center  ${
            isLandscape ? "ml-60" : ""
          }`}
        >
          <div className="max-w-[1024px] w-full">
            <div className="">
              <Outlet />
            </div>
            {/* <TanStackRouterDevtools /> */}

            {!isLandscape && (
              <>
                <div className="fixed bottom-7 right-4">
                  <MainRadialMenu />
                </div>
                <ActionBar />
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
});
