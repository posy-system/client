import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminNav from "../../components/adminNav/AdminNav";
import LogoutButton from "../../components/button/LogoutButton";

function useAdminTitle() {
  const { pathname } = useLocation();

  return useMemo(() => {
    if (pathname === "/admindashboard") return "Dashboard";
    if (pathname.startsWith("/admindashboard/inventory")) return "Inventory";
    if (pathname.startsWith("/admindashboard/sales")) return "Sales";
    if (pathname.startsWith("/admindashboard/bills")) return "Bills";
    if (pathname.startsWith("/admindashboard/notifications")) return "Notifications";
    return "Admin";
  }, [pathname]);
}

export default function AdminLayout() {
  const title = useAdminTitle();

  return (
    <div className="flex min-h-[calc(100vh-72px)]">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <AdminNav />
      </aside>

      <main className="min-w-0 flex-1 p-5 sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage your POS system.
            </p>
          </div>
          <div className="flex justify-end">
            <LogoutButton />
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
