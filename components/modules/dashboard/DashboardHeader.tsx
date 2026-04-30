"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell, Search, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* Search */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search documents, people, or settings..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative group">
          <Bell className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary/80 ring-2 ring-background"></span>
        </Button>

        <div className="h-4 w-px bg-border hidden sm:block"></div>

        {/* User menu & Avatar */}
        <div className="flex items-center space-x-3 cursor-pointer group hover:opacity-80 transition-opacity">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-medium leading-none">{user.name || "Founder"}</span>
            <span className="text-xs text-muted-foreground leading-none mt-1">{user.email}</span>
          </div>
          <div className="h-8 w-8 rounded-full border bg-muted flex items-center justify-center overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                {user.name?.[0]?.toUpperCase() || "F"}
              </span>
            )}
          </div>
        </div>

        {/* Sign out */}
        <Button
          variant="outline"
          size="sm"
          className="ml-2 hidden sm:flex text-xs h-8 px-3"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          Sign out
        </Button>
      </div>
    </header>
  );
}
