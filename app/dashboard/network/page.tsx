import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Users, UserPlus, TrendingUp } from "lucide-react";

export default function NetworkPage() {
  const connections = [
    {
      name: "Sarah Chen",
      role: "Angel Investor",
      type: "Investor",
      matchScore: 95,
      status: "Connected",
    },
    {
      name: "Michael Roberts",
      role: "SaaS Founder",
      type: "Peer",
      matchScore: 88,
      status: "Connected",
    },
    {
      name: "Emily Davis",
      role: "Product Designer",
      type: "Potential Co-founder",
      matchScore: 92,
      status: "Pending",
    },
  ];

  const recommendations = [
    {
      name: "David Kim",
      role: "Tech Advisor",
      type: "Mentor",
      matchScore: 90,
      reason: "Expertise in scaling SaaS products",
    },
    {
      name: "Lisa Martinez",
      role: "Marketing Expert",
      type: "Advisor",
      matchScore: 85,
      reason: "Experience in B2B growth strategies",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Networking
          </h1>
          <p className="mt-1 text-gray-600">
            Connect with investors, mentors, and potential co-founders
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Find Connections
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Connections
            </CardTitle>
            <Network className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections.filter((c) => c.status === "Connected").length}
            </div>
            <p className="text-xs text-gray-600">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections.filter((c) => c.status === "Pending").length}
            </div>
            <p className="text-xs text-gray-600">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Matches
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <p className="text-xs text-gray-600">Recommended for you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Match Quality
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-gray-600">Average score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Your Connections */}
        <Card>
          <CardHeader>
            <CardTitle>Your Network</CardTitle>
            <CardDescription>
              People you&apos;re connected with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connections.map((connection, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                      {connection.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {connection.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {connection.role} · {connection.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-sm font-semibold text-blue-600">
                      {connection.matchScore}% match
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        connection.status === "Connected"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {connection.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Recommended Connections</CardTitle>
            <CardDescription>
              People who match your needs and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold">
                        {rec.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rec.name}</p>
                        <p className="text-sm text-gray-600">
                          {rec.role} · {rec.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-purple-600">
                      {rec.matchScore}% match
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{rec.reason}</p>
                  <Button className="mt-3 w-full" variant="outline" size="sm">
                    <UserPlus className="mr-2 h-3 w-3" />
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI Networking Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                🎯 Perfect Match Found
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Emily Davis is a 92% match as a potential co-founder. She has
                complementary skills in product design and shares your vision
                for user-centric products.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                💡 Networking Strategy
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Focus on building relationships with advisors in your industry.
                Your network strength will increase by 40% with 2-3 key advisor
                connections.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

