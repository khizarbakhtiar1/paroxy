import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const stats = [
    { title: "Cash Runway", value: "6.2 months", change: "+2 weeks", trend: "up", icon: DollarSign },
    { title: "Active Tasks", value: "12", change: "-3 from last week", trend: "down", icon: CheckCircle2 },
    { title: "Team Members", value: "3", change: "+1 this month", trend: "up", icon: Users },
    { title: "Compliance Items", value: "2 pending", change: "Due this week", trend: "neutral", icon: AlertCircle },
  ];

  const recentActivity = [
    { title: "Legal document signed", description: "NDA with potential co-founder", time: "2 hours ago", type: "legal" },
    { title: "Payment received", description: "$5,000 from first customer", time: "5 hours ago", type: "financial" },
    { title: "Marketing campaign launched", description: "Instagram ads for product launch", time: "1 day ago", type: "marketing" },
    { title: "AI insight generated", description: "Cash flow optimization suggestion", time: "2 days ago", type: "ai" },
  ];

  const upcomingTasks = [
    { title: "File quarterly taxes", dueDate: "In 5 days", priority: "high" },
    { title: "Review shareholder agreement", dueDate: "In 1 week", priority: "medium" },
    { title: "Schedule investor call", dueDate: "In 2 weeks", priority: "high" },
    { title: "Update website content", dueDate: "In 3 weeks", priority: "low" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto pb-10">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Good morning, {session?.user?.name?.split(" ")[0] || "Founder"}. Here is your startup's pulse.
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="border-border shadow-none rounded-xl bg-card transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground/60" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />}
                  {stat.trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent activity */}
        <Card className="col-span-4 border-border shadow-none rounded-xl">
          <CardHeader className="border-b px-6 py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">Pulse & Activity</CardTitle>
            <button className="text-muted-foreground hover:text-foreground">
               <MoreHorizontal className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y relative">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-4 px-6 py-4 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 cursor-pointer">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming tasks */}
        <Card className="col-span-3 border-border shadow-none rounded-xl">
          <CardHeader className="border-b px-6 py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">Upcoming Actions</CardTitle>
            <button className="text-sm font-medium text-primary hover:underline">
              View all
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {upcomingTasks.map((task, idx) => (
                <div key={idx} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-4 w-4 items-center justify-center rounded border border-input bg-transparent group-hover:border-primary transition-colors" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                    </div>
                  </div>
                  {task.priority === "high" && (
                    <span className="inline-flex items-center rounded-full border border-red-200/50 bg-red-50/50 px-2 py-0.5 text-xs font-medium text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                      High
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
