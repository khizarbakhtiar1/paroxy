"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Scale,
  DollarSign,
  TrendingUp,
  Users,
  MessageSquare,
  Brain,
  Network,
  Bell,
  Settings,
} from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Legal & Compliance",
    href: "/dashboard/legal",
    icon: Scale,
  },
  {
    title: "Financial",
    href: "/dashboard/financial",
    icon: DollarSign,
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    icon: TrendingUp,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai",
    icon: MessageSquare,
  },
  {
    title: "Mental Health",
    href: "/dashboard/wellness",
    icon: Brain,
  },
  {
    title: "Network",
    href: "/dashboard/network",
    icon: Network,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-lg font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PAROXY</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-4 text-white">
            <p className="text-sm font-semibold">Upgrade to Pro</p>
            <p className="mt-1 text-xs opacity-90">
              Unlock all features and unlimited access
            </p>
            <button className="mt-3 w-full rounded-md bg-white px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-gray-100">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

