import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const stats = [
    {
      title: "Cash Runway",
      value: "6 months",
      change: "+2 weeks",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Tasks",
      value: "12",
      change: "-3 from last week",
      trend: "down",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Team Members",
      value: "3",
      change: "+1 this month",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Compliance Items",
      value: "2 pending",
      change: "Due this week",
      trend: "neutral",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivity = [
    {
      title: "Legal document signed",
      description: "NDA with potential co-founder",
      time: "2 hours ago",
      type: "legal",
    },
    {
      title: "Payment received",
      description: "$5,000 from first customer",
      time: "5 hours ago",
      type: "financial",
    },
    {
      title: "Marketing campaign launched",
      description: "Instagram ads for product launch",
      time: "1 day ago",
      type: "marketing",
    },
    {
      title: "AI insight generated",
      description: "Cash flow optimization suggestion",
      time: "2 days ago",
      type: "ai",
    },
  ];

  const upcomingTasks = [
    {
      title: "File quarterly taxes",
      dueDate: "In 5 days",
      priority: "high",
    },
    {
      title: "Review shareholder agreement",
      dueDate: "In 1 week",
      priority: "medium",
    },
    {
      title: "Schedule investor call",
      dueDate: "In 2 weeks",
      priority: "high",
    },
    {
      title: "Update website content",
      dueDate: "In 3 weeks",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Founder"}! 👋
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s what&apos;s happening with your startup today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="flex items-center text-xs text-gray-600">
                  {stat.trend === "up" && (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                  )}
                  {stat.trend === "down" && (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions across all modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Important items that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-600">{task.dueDate}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI Founder Twin Insights</span>
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your business context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                💡 Cash Flow Optimization
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Your burn rate decreased by 15% this month. Consider reallocating
                savings to marketing to accelerate growth.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                📈 Marketing Opportunity
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Your LinkedIn engagement is up 40%. Now is a great time to share
                your founder story and attract co-founders.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                ⚖️ Compliance Reminder
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Your privacy policy needs updating for GDPR compliance. I can
                generate an updated version for you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

