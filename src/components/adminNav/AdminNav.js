import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiTrendingUp,
  FiFileText,
  FiBell,
} from "react-icons/fi";

const navItems = [
  { to: "/admindashboard", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admindashboard/inventory", label: "Inventory", icon: FiBox },
  { to: "/admindashboard/sales", label: "Sales", icon: FiTrendingUp },
  { to: "/admindashboard/bills", label: "Bills", icon: FiFileText },
  { to: "/admindashboard/notifications", label: "Notification", icon: FiBell },
];

export default function AdminNav() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-4 py-4 dark:border-[#2A2A2C]">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Admin
        </p>
        <p className="mt-1 text-lg font-semibold">POS Dashboard</p>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "group flex items-center gap-3 rounded-xl border-l-4 px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#232325]",
                    ].join(" ")
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-3 text-xs text-slate-500 dark:border-[#2A2A2C] dark:text-slate-400">
        v1.0
      </div>
    </div>
  );
}
