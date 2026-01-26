import React from "react";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Total Sales
        </p>
        <p className="mt-2 text-2xl font-semibold">—</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Inventory Items
        </p>
        <p className="mt-2 text-2xl font-semibold">—</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Bills
        </p>
        <p className="mt-2 text-2xl font-semibold">—</p>
      </div>
    </div>
  );
}
