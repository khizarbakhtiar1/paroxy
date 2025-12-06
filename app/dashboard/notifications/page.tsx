import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Legal document signed",
      message: "Your NDA has been successfully signed by Jane Doe",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Compliance deadline approaching",
      message: "Quarterly tax filing is due in 5 days",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New AI insight available",
      message: "Check out personalized recommendations for cash flow optimization",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Payment received",
      message: "$5,000 from Acme Corp has been deposited",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "New connection request",
      message: "Michael Roberts wants to connect with you",
      time: "3 days ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-gray-600">
            Stay updated with your startup activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline">Mark all as read</Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-gray-600">Require your attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Today
            </CardTitle>
            <Bell className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.time.includes("hour")).length}
            </div>
            <p className="text-xs text-gray-600">In the last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Important Alerts
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.type === "warning").length}
            </div>
            <p className="text-xs text-gray-600">Need immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>
            Your latest updates and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                  !notification.read
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-100"
                }`}
              >
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

