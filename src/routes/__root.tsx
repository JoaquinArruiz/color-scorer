import { Outlet, createRootRoute } from "@tanstack/react-router";

import Sidebar from "@/components/Sidebar";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { PageTabs } from "@/components/PageTabs";
import { MobileColorBar } from "@/components/mobile/MobileColorBar";
import { useColorUrlSync } from "@/hooks/useColorUrlSync";

const RootLayout = () => {
  useColorUrlSync();

  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileHeader />

      <main className="pb-36 lg:pb-0 lg:pl-72">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
          <PageTabs className="mb-6" />
          <Outlet />
        </div>
      </main>

      <MobileColorBar />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
