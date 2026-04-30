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
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Legal & Compliance", href: "/dashboard/legal", icon: Scale },
  { title: "Financial", href: "/dashboard/financial", icon: DollarSign },
  { title: "Marketing", href: "/dashboard/marketing", icon: TrendingUp },
  { title: "Team", href: "/dashboard/team", icon: Users },
  { title: "AI Assistant", href: "/dashboard/ai", icon: MessageSquare },
  { title: "Mental Health", href: "/dashboard/wellness", icon: Brain },
  { title: "Network", href: "/dashboard/network", icon: Network },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <span className="text-sm font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-base font-semibold tracking-tight">Paroxy</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer minimal ad */}
      <div className="p-4 border-t">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Unlock advanced AI analytics and compliance tracking.
          </p>
          <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
