import { Outlet, createRootRoute } from "@tanstack/react-router";

import { MainRadialMenu } from "@/components/radial-menu/MainRadialMenu";
import ActionBar from "@/components/actionBar";
import { useOrientation } from "@/hooks/useOrientation";
import Sidebar from "@/components/Sidebar";

export const Route = createRootRoute({
  component: () => {
    const orientation = useOrientation();
    const isLandscape = orientation === "landscape";

    return (
      <div className="min-h-screen">
        {isLandscape && <Sidebar />}

        <main className={isLandscape ? "pl-72" : "pb-28"}>
          <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </div>
        </main>

        {!isLandscape && (
          <>
            <div className="fixed right-4 bottom-7">
              <MainRadialMenu />
            </div>
            <ActionBar />
          </>
        )}
      </div>
    );
  },
});
